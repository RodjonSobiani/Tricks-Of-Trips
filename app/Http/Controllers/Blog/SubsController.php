<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Mail\SubscribeEmail;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SubsController extends Controller
{
    public function subscribe(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email|unique:subscriptions'
        ]);

        $subs = Subscription::add($request->get('email'));
        $subs->generateToken();

        Mail::to($subs)->send(new SubscribeEmail($subs));

        return redirect()->back()->with('status', 'Пожалуйста, проверьте Вашу почту.');
    }

    public function verify($token)
    {
        $subs = Subscription::where('token', $token)->firstOrFail();
        $subs->token = null;
        $subs->save();
        return redirect('blog')->with('status', 'Ваша почта подтверждена! Благодарим Вас за подписку!');
    }
}
