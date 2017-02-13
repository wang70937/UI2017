#pragma once
#include "animate_base.h"

// 自定义的动画函数， f 为 当前时间比例，返回位移比例

#define PI 3.141592653f
float __stdcall TimingFuction(float f)
{
	return sin(PI * f * 2);
}


class CustomTimingFuctionAnimate : public Animate
{
public:
	virtual void Init() override
	{
		m_pPanel = (UI::IPanel*)m_pWindow->FindObject(L"panel");

		UIA::IStoryboard* storyboard = CreateStoryboard();
		UIA::IFromToTimeline* x = storyboard->CreateTimeline(0)
			->SetParam(10, UI::ScaleByDpi(380), 800);
		x->SetEaseType(UIA::linear);
		x->SetAutoReverse(true);

		UIA::IFromToTimeline* y = storyboard->CreateTimeline(1)
			->SetParam(0, -UI::ScaleByDpi(200), 800);
		y->SetAutoReverse(true);
		y->SetCustomTimingFuction(TimingFuction);

		// 占满CPU，软件渲染+移动形动画
		// storyboard->BeginFullCpu();

		storyboard->Begin();
	}

	virtual void Release() override
	{

	}

	virtual void OnAnimateStart(UIA::IStoryboard*) override
	{
		m_pPanel->EnableLayer(true);
	}

	virtual void OnAnimateEnd(UIA::IStoryboard*, UIA::E_ANIMATE_END_REASON e) override
	{
		m_pPanel->EnableLayer(false);
		Destroy(this);
	}

	virtual UIA::E_ANIMATE_TICK_RESULT OnAnimateTick(UIA::IStoryboard* story) override
	{
		int x = story->GetTimeline(0)->GetCurrentIntValue();
		int y = story->GetTimeline(1)->GetCurrentIntValue();

		// 		m_pPanel->SetObjectPos(x, y, 0, 0, SWP_NOSIZE);
		// 		m_pWindow->GetWindowRender()->InvalidateNow();

		m_pPanel->SetTranslate(x, y, 0);

		return UIA::ANIMATE_TICK_RESULT_CONTINUE;
	}

private:
	UI::IPanel*  m_pPanel;
};