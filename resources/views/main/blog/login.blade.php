@extends('main.blog.layout')

@section('content')

    <div class="main-content">
        <div class="container">
            <div class="row">
                <div class="col-md-8">

                    <div id="form" class="leave-comment mr0">
                        <h3 id="login-form" class="text-uppercase">Вход</h3>
                        <br>
                        <form class="auth form-horizontal contact-form" role="form" method="post" action="/auth/login">
                            {{csrf_field()}}
                            <div class="form-group">
                                <div class="col-md-12">
                                    <input type="text" class="form-control" id="email" name="email"
                                           placeholder="Электронная почта*" value="{{old('email')}}">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-12">
                                    <input type="password" class="form-control" id="password" name="password"
                                           placeholder="Пароль*">
                                </div>
                            </div>
                            <button type="submit" name="login" class="btn send-btn">Вход </button>

                        </form>
                    </div>
                </div>
                @include('main.blog._sidebar')
            </div>
        </div>
    </div>

@endsection
