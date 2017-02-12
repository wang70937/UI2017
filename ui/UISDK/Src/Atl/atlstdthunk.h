// This is a part of the Active Template Library.
// Copyright (C) Microsoft Corporation
// All rights reserved.
//
// This source code is only intended as a supplement to the
// Active Template Library Reference and related
// electronic documentation provided with the library.
// See these sources for detailed information regarding the
// Active Template Library product.

// Modify History:
// 2016.9.19
// __AllocStdCallThunk/__FreeStdCallThunk
// 存在内存泄露，会被检测工具报告出来。这里将源码拽出来，屏蔽这块代码

#ifdef __ATLSTDTHUNK_H__ 
#error "不使用atl自带的thunk"
#endif
#define __ATLSTDTHUNK_H__ // 屏蔽原文件

#ifndef _UI_ATLSTDTHUNK_H__
#define _UI_ATLSTDTHUNK_H__

#pragma once

#pragma push_macro("new")
#undef new


#include <atldef.h>

#if !defined(_ATL_USE_WINAPI_FAMILY_DESKTOP_APP)
#error This file is not compatible with the current WINAPI_FAMILY
#endif

namespace ATL
{

/////////////////////////////////////////////////////////////////////////////
// Thunks for __stdcall member functions

#if defined(_M_IX86)
PVOID __stdcall __AllocStdCallThunk(VOID);
VOID  __stdcall __FreeStdCallThunk(_In_opt_ PVOID);

#pragma pack(push,1)
struct _stdcallthunk
{
	DWORD   m_mov;          // mov dword ptr [esp+0x4], pThis (esp+0x4 is hWnd)
	DWORD   m_this;         //
	BYTE    m_jmp;          // jmp WndProc
	DWORD   m_relproc;      // relative jmp
	BOOL Init(
		_In_ DWORD_PTR proc,
		_In_opt_ void* pThis)
	{
		m_mov = 0x042444C7;  //C7 44 24 0C
		m_this = PtrToUlong(pThis);
		m_jmp = 0xe9;
		m_relproc = DWORD((INT_PTR)proc - ((INT_PTR)this+sizeof(_stdcallthunk)));
		// write block from data cache and
		//  flush from instruction cache
		FlushInstructionCache(GetCurrentProcess(), this, sizeof(_stdcallthunk));
		return TRUE;
	}
	//some thunks will dynamically allocate the memory for the code
	void* GetCodeAddress()
	{
		return this;
	}
#ifndef _DEBUG
	_Ret_maybenull_ _Post_writable_byte_size_(sizeof(_stdcallthunk)) void* operator new(_In_ size_t)
	{
        return __AllocStdCallThunk();
    }
    void operator delete(_In_opt_ void* pThunk)
    {
        __FreeStdCallThunk(pThunk);
    }
#endif
};
#pragma pack(pop)

#elif defined(_M_AMD64)
PVOID __stdcall __AllocStdCallThunk(VOID);
VOID  __stdcall __FreeStdCallThunk(PVOID);
#pragma pack(push,2)
struct _stdcallthunk
{
    USHORT  RcxMov;         // mov rcx, pThis
    ULONG64 RcxImm;         //
    USHORT  RaxMov;         // mov rax, target
    ULONG64 RaxImm;         //
    USHORT  RaxJmp;         // jmp target
    BOOL Init(
		_In_ DWORD_PTR proc,
		_In_opt_ void *pThis)
    {
        RcxMov = 0xb948;          // mov rcx, pThis
        RcxImm = (ULONG64)pThis;  //
        RaxMov = 0xb848;          // mov rax, target
        RaxImm = (ULONG64)proc;   //
        RaxJmp = 0xe0ff;          // jmp rax
        FlushInstructionCache(GetCurrentProcess(), this, sizeof(_stdcallthunk));
		return TRUE;
    }
	//some thunks will dynamically allocate the memory for the code
	void* GetCodeAddress()
	{
		return this;
	}
#ifndef _DEBUG
	_Ret_maybenull_ _Post_writable_byte_size_(sizeof(_stdcallthunk)) void* operator new(_In_ size_t)
	{
        return __AllocStdCallThunk();
    }
    void operator delete(_In_opt_ void* pThunk)
    {
        __FreeStdCallThunk(pThunk);
    }
#endif
};
#pragma pack(pop)
#elif defined(_SH3_)
#pragma pack(push,4)
struct _stdcallthunk // this should come out to 16 bytes
{
	WORD	m_mov_r0;		// mov.l	pFunc,r0
	WORD	m_mov_r1;		// mov.l	pThis,r1
	WORD	m_jmp;			// jmp		@r0
	WORD	m_nop;			// nop
	DWORD	m_pFunc;
	DWORD	m_pThis;
	BOOL Init(
		_In_ DWORD_PTR proc,
		_In_opt_ void* pThis)
	{
		m_mov_r0 = 0xd001;
		m_mov_r1 = 0xd402;
		m_jmp = 0x402b;
		m_nop = 0x0009;
		m_pFunc = (DWORD)proc;
		m_pThis = (DWORD)pThis;
		// write block from data cache and
		//  flush from instruction cache
		FlushInstructionCache(GetCurrentProcess(), this, sizeof(_stdcallthunk));
		return TRUE;
	}
	void* GetCodeAddress()
	{
		return this;
	}
};
#pragma pack(pop)
#elif defined(_MIPS_)
#pragma pack(push,4)
struct _stdcallthunk
{
	WORD	m_pFuncHi;
	WORD	m_lui_t0;		// lui		t0,PFUNC_HIGH
	WORD	m_pFuncLo;
	WORD	m_ori_t0;		// ori		t0,t0,PFUNC_LOW
	WORD	m_pThisHi;
	WORD	m_lui_a0;		// lui		a0,PTHIS_HIGH
	DWORD	m_jr_t0;		// jr		t0
	WORD	m_pThisLo;
	WORD	m_ori_a0;		// ori		a0,PTHIS_LOW
	BOOL Init(
		_In_ DWORD_PTR proc,
		_In_opt_ void* pThis)
	{
		m_pFuncHi = HIWORD(proc);
		m_lui_t0  = 0x3c08;
		m_pFuncLo = LOWORD(proc);
		m_ori_t0  = 0x3508;
		m_pThisHi = HIWORD(pThis);
		m_lui_a0  = 0x3c04;
		m_jr_t0   = 0x01000008;
		m_pThisLo = LOWORD(pThis);
		m_ori_a0  = 0x3484;
		// write block from data cache and
		//  flush from instruction cache
		FlushInstructionCache(GetCurrentProcess(), this, sizeof(_stdcallthunk));
		return TRUE;
	}
	void* GetCodeAddress()
	{
		return this;
	}
};
#pragma pack(pop)
#elif defined (_M_THUMB)
// note this case must be before _M_ARM because _M_ARM is also defined
PVOID __stdcall __AllocStdCallThunk(VOID);
VOID  __stdcall __FreeStdCallThunk(PVOID);
#pragma pack(push,2)
struct _stdcallthunk
{
	USHORT	m_mov_r0[2];	// mov	r0, pThis
	USHORT	m_mov_pc[2];	// mov	pc, pFunc
	DWORD	m_pThis;
	DWORD	m_pFunc;
	BOOL Init(DWORD_PTR proc, void* pThis)
	{
		m_mov_r0[0] = 0xF8DF;
		m_mov_r0[1] = 0x0004;
 		m_mov_pc[0] = 0xF8DF;
		m_mov_pc[1] = 0xF004;
		m_pThis = (DWORD)pThis;
		m_pFunc = (DWORD)proc;
		// write block from data cache and
		//  flush from instruction cache
		FlushInstructionCache(GetCurrentProcess(), this, sizeof(_stdcallthunk));
		return TRUE;
	}
	void* GetCodeAddress()
	{
		return (void *)((ULONG_PTR)this | 1);
	}
#ifndef _DEBUG
	void* operator new(size_t)
	{
		return __AllocStdCallThunk();
    }
	void operator delete(void* pThunk)
	{
		__FreeStdCallThunk(pThunk);
	}
#endif
};
#pragma pack(pop)
#elif defined(_ARM_)
#pragma pack(push,4)
struct _stdcallthunk // this should come out to 16 bytes
{
	DWORD	m_mov_r0;		// mov	r0, pThis
	DWORD	m_mov_pc;		// mov	pc, pFunc
	DWORD	m_pThis;
	DWORD	m_pFunc;
	BOOL Init(
		_In_ DWORD_PTR proc,
		_In_opt_ void* pThis)
	{
		m_mov_r0 = 0xE59F0000;
		m_mov_pc = 0xE59FF000;
		m_pThis = (DWORD)pThis;
		m_pFunc = (DWORD)proc;
		// write block from data cache and
		//  flush from instruction cache
		FlushInstructionCache(GetCurrentProcess(), this, sizeof(_stdcallthunk));
		return TRUE;
	}
	void* GetCodeAddress()
	{
		return this;
	}
};
#pragma pack(pop)
#elif defined(_M_IA64)
#pragma pack(push,8)
extern "C" void _StdCallThunkProcProc(void);
struct _FuncDesc
{
    void* pfn;
    void* gp;
};
struct _stdcallthunk
{
    _FuncDesc m_funcdesc;
    void* m_pFunc;
    void* m_pThis;

    BOOL Init(
		_In_ DWORD_PTR proc,
		_In_opt_ void* pThis)
    {
        m_funcdesc.pfn = ((_FuncDesc*)(&_StdCallThunkProcProc))->pfn;  // Pointer to actual beginning of StdCallThunkProc
        m_funcdesc.gp = &m_pFunc;
        m_pFunc = reinterpret_cast< void* >( proc );
        m_pThis = pThis;
        ::FlushInstructionCache( GetCurrentProcess(), this, sizeof( _stdcallthunk ) );
		return TRUE;
    }
    void* GetCodeAddress()
    {
        return( &m_funcdesc );
    }
};
#pragma pack(pop)
//IA64 thunks do not currently use the atlhunk.cpp allocator.
#else
#error Only ARM, ALPHA, SH3, MIPS, IA64, AMD64 and X86 supported
#endif


#if defined(_M_IX86) || defined (_M_AMD64) || defined(_M_ARM)

#pragma pack(push,8)
class CDynamicStdCallThunk
{
public:
	_stdcallthunk *pThunk;

	CDynamicStdCallThunk()
	{
		pThunk = NULL;
	}

	~CDynamicStdCallThunk()
	{
		if (pThunk)
		{
			delete pThunk;
		}
	}

	BOOL Init(
		_In_ DWORD_PTR proc,
		_In_opt_ void *pThis)
	{
		if (pThunk == NULL)
		{
			pThunk = new _stdcallthunk;
			if (pThunk == NULL)
			{
				return FALSE;
			}
		}
		return pThunk->Init(proc, pThis);
	}


	void* GetCodeAddress()
	{
		return pThunk->GetCodeAddress();
	}
};

#pragma pack(pop)
typedef CDynamicStdCallThunk CStdCallThunk;
#else
typedef _stdcallthunk CStdCallThunk;
#endif  // _M_IX86 || _M_AMD64 || _M_ARM



/////////////////////////////////////////////////////////////////////////////
// WindowProc thunks

// class CWndProcThunk
// {
// public:
//     _AtlCreateWndData cd;
//     CStdCallThunk thunk;
// 
//     BOOL Init(
//         _In_opt_ WNDPROC proc,
//         _In_opt_ void* pThis)
//     {
//         return thunk.Init((DWORD_PTR)proc, pThis);
//     }
//     WNDPROC GetWNDPROC()
//     {
//         return (WNDPROC)thunk.GetCodeAddress();
//     }
// };

}   // namespace ATL


#pragma pop_macro("new")





#endif // _UI_ATLSTDTHUNK_H__

