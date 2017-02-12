#include "stdafx.h"
#include "gpu_compositor.h"
#include "d3d10\D3DApp.h"
#include "gpu_layer.h"
#include "d3d10\common\Effects.h" 
using namespace UI;


//////////////////////////////////////////////////////////////////////////

GpuComposition::GpuComposition(HWND hWnd)
{
	m_pRootTexture = NULL;
    m_hWnd = hWnd;

    m_pSwapChain = NULL;
    m_pRenderTargetView = NULL;
	m_pDepthStencilBuffer = NULL;
	m_pDepthStencilView = NULL;
    m_sizeBackBuffer.cx = m_sizeBackBuffer.cy = 8;

    CreateSwapChain();
}

GpuComposition::~GpuComposition()
{
    if (D3D10App::Get()->IsActiveSwapChain(m_hWnd))
    {
        D3D10App::Get()->m_pDevice->OMSetRenderTargets(0, NULL, NULL);
        D3D10App::Get()->SetActiveSwapChain(NULL);
    }

	SAFE_RELEASE(m_pDepthStencilBuffer);
	SAFE_RELEASE(m_pDepthStencilView);
    SAFE_RELEASE(m_pRenderTargetView);
	SAFE_RELEASE(m_pSwapChain);
}

IGpuRenderLayer*  GpuComposition::CreateLayerTexture()
{
	GpuRenderLayer* p = new GpuRenderLayer;
    p->SetHardwareComposition(this);
    return p;
}
void  GpuComposition::SetRootLayerTexture(IGpuRenderLayer* p)
{
    m_pRootTexture = static_cast<GpuRenderLayer*>(p);
}
GpuRenderLayer*  GpuComposition::GetRootLayerTexture()
{
    return m_pRootTexture;
}
void  GpuComposition::CreateSwapChain()
{
    if (!m_hWnd)
        return;
    if (!D3D10App::Get()->m_pDXGIFactory)
        return;

    RECT  rc;
    GetClientRect(m_hWnd, &rc);
    if (rc.right == rc.left || rc.bottom == rc.top)
        return;

    DXGI_SWAP_CHAIN_DESC swapDesc;
    ::ZeroMemory(&swapDesc, sizeof(swapDesc));

    m_sizeBackBuffer.cx = rc.right-rc.left;
    m_sizeBackBuffer.cy = rc.bottom-rc.top;

    swapDesc.BufferDesc.Width = m_sizeBackBuffer.cx;
    swapDesc.BufferDesc.Height = m_sizeBackBuffer.cy;
    swapDesc.BufferDesc.Format = DXGI_FORMAT_R8G8B8A8_UNORM;
    swapDesc.BufferDesc.RefreshRate.Numerator = 60;
    swapDesc.BufferDesc.RefreshRate.Denominator = 1;
    swapDesc.SampleDesc.Count = 4;

    UINT quality = D3D10App::Get()->GetDeviceMultisampleQuality();
	if (quality <= 0)
	{
		swapDesc.SampleDesc.Count = 1;
		swapDesc.SampleDesc.Quality = 0;
	}
	else
	{
		swapDesc.SampleDesc.Quality = quality-1;
	}

    swapDesc.BufferUsage = DXGI_USAGE_RENDER_TARGET_OUTPUT;
    swapDesc.BufferCount = 1;
    swapDesc.OutputWindow = m_hWnd;
    swapDesc.Windowed = TRUE;

    /*HRESULT hr = */D3D10App::Get()->m_pDXGIFactory->CreateSwapChain(
        D3D10App::Get()->m_pDevice, &swapDesc, &m_pSwapChain);

    if (!m_pSwapChain)
        return;

    ReCreateRenderTargetView();
	ReCreateStencilView();

    D3D10_VIEWPORT vp = {0, 0, m_sizeBackBuffer.cx, m_sizeBackBuffer.cy, 0, 1};
    D3D10App::Get()->m_pDevice->RSSetViewports( 1, &vp );

}

void  GpuComposition::ReCreateRenderTargetView()
{
    if (m_pRenderTargetView)
    {
        D3D10App::Get()->m_pDevice->OMSetRenderTargets(0, NULL, NULL);
        SAFE_RELEASE(m_pRenderTargetView);
    }

    ID3D10Texture2D*  pBuffer = NULL;
    HRESULT hr = m_pSwapChain->GetBuffer(0, __uuidof(ID3D10Texture2D), (VOID**)&pBuffer);
    if (SUCCEEDED(hr))
    {
        // We need to create a render target view because 
        // we would like to bind the back buffer 
        // of our swap chain as a render target, so that 
        // Direct3D 10 can render onto it. 
        hr = D3D10App::Get()->m_pDevice->CreateRenderTargetView(pBuffer, NULL, &m_pRenderTargetView);
    }
    pBuffer->Release();
}


void  GpuComposition::ReCreateStencilView()
{
	SAFE_RELEASE(m_pDepthStencilView);
	SAFE_RELEASE(m_pDepthStencilBuffer);

	D3D10_TEXTURE2D_DESC dsDesc;
	dsDesc.Format = DXGI_FORMAT_D24_UNORM_S8_UINT;
	dsDesc.Width = m_sizeBackBuffer.cx;
	dsDesc.Height = m_sizeBackBuffer.cy;
	dsDesc.BindFlags = D3D10_BIND_DEPTH_STENCIL;
	dsDesc.MipLevels = 1;
	dsDesc.ArraySize = 1;
	dsDesc.CPUAccessFlags = 0;
	dsDesc.SampleDesc.Count = 4;
	UINT quality = D3D10App::Get()->GetDeviceMultisampleQuality();
	if (quality <= 0)
	{
		dsDesc.SampleDesc.Count = 1;
		dsDesc.SampleDesc.Quality = 0;
	}
	else
	{
		dsDesc.SampleDesc.Quality = quality-1;
	}

	dsDesc.MiscFlags = 0;
	dsDesc.Usage = D3D10_USAGE_DEFAULT;
	HRESULT hr = D3D10App::Get()->m_pDevice->CreateTexture2D(
		&dsDesc,0,&m_pDepthStencilBuffer);
	assert (SUCCEEDED(hr));

	D3D10App::Get()->m_pDevice->CreateDepthStencilView(
		m_pDepthStencilBuffer, 0, &m_pDepthStencilView);
}

void  GpuComposition::Resize(UINT nWidth, UINT nHeight)
{
    if (!m_pSwapChain)
    {
        CreateSwapChain();
        if (!m_pSwapChain)
            return;
    }

    if (m_sizeBackBuffer.cx == (int)nWidth && m_sizeBackBuffer.cy == (int)nHeight)
        return;

	m_sizeBackBuffer.cx = nWidth;
	m_sizeBackBuffer.cy = nHeight;

    // 如果当前是选中的自己，则下次BeginCommit重新设置
	if (D3D10App::Get()->IsActiveSwapChain(m_hWnd))
	{
		D3D10App::Get()->m_pDevice->OMSetRenderTargets(0, NULL, NULL);
		D3D10App::Get()->SetActiveSwapChain(NULL);
	}

    // 光ResizeBuffers有问题，还得重新创建rendertargetview
	// Release all outstanding references to the swap chain's buffers.
    SAFE_RELEASE(m_pRenderTargetView);

    m_pSwapChain->ResizeBuffers(1, nWidth, nHeight, DXGI_FORMAT_B8G8R8A8_UNORM, 0);

    ReCreateRenderTargetView();
	ReCreateStencilView();
}

bool  GpuComposition::BeginCommit()
{
    if (!m_pSwapChain)
        return false;

    if (!D3D10App::Get()->IsActiveSwapChain(m_hWnd))
    {
        D3D10_VIEWPORT vp = {0, 0, m_sizeBackBuffer.cx, m_sizeBackBuffer.cy, 0, 1};
        D3D10App::Get()->m_pDevice->RSSetViewports(1, &vp);
        D3D10App::Get()->m_pDevice->OMSetRenderTargets(
			1, &m_pRenderTargetView, m_pDepthStencilView);
        
        D3DXMATRIX  matrix;
        D3DXMatrixOrthoOffCenterLH(&matrix, 
            0, 
			(float)m_sizeBackBuffer.cx, 
            (float)m_sizeBackBuffer.cy, 
			0,
            -2000.f, 
			2000.f);
        Effects::m_pFxOrthMatrix->SetMatrix((float*)&matrix);

        D3D10App::Get()->SetActiveSwapChain(m_hWnd);
    }

	// TBD: 其实大部分情况都不需要CLEAR，但如果背景是透明的，则需要CLEAR，
	//      否则会导致背景重叠

	// ??? 使用{0,0,0,0}会导致渲染不正常
    FLOAT rgba[4] =  { 0,0,0,0 };  
    D3D10App::Get()->m_pDevice->ClearRenderTargetView(
            m_pRenderTargetView, rgba);

    ClearStencil();

    return true;

}
void  GpuComposition::EndCommit()
{
//     if (m_pRootTexture)
//         m_pRootTexture->Commit();

    //TODO: 什么场景会触发Dx10 lost device?  
    // 修改分辨率、颜色深度、锁屏都没出现什么问题
    HRESULT hr = m_pSwapChain->Present(1, 0);
    if (DXGI_STATUS_OCCLUDED == hr)
    {
        // There is a window covering our entire rendering area.
        // Don't render until we're visible again.
        // 或者将窗口的大小拉伸为0时，也会出现这个返回值
    }
    else if (DXGI_ERROR_DEVICE_RESET == hr)
    {
        // If a mode change happened, we must reset the device
    }
    else if (DXGI_ERROR_DEVICE_REMOVED == hr)
    {
    }
    else if (SUCCEEDED( hr ))
    {
    }
}


void  GpuComposition::ClearStencil()
{
    assert(m_pDepthStencilView);
    D3D10App::Get()->m_pDevice->ClearDepthStencilView(
        m_pDepthStencilView, 
        D3D10_CLEAR_DEPTH|D3D10_CLEAR_STENCIL,
        1.0f, 
        0);
}