@extends('main.blog.layout')

@section('content')

    <div class="main-content">
        <div class="container">
            <div class="row">
                <div class="col-md-8">

                    <div class="leave-comment mr0">
                        <h3 class="text-uppercase">Мой профиль</h3>
                        <br>
                        <img src="{{$user->getImage()}}" alt="Аватар" class="profile-image">
                        <form class="profile form-horizontal contact-form" role="form" method="post" action="/blog/profile"
                        enctype="multipart/form-data">
                            {{csrf_field()}}
                            <div class="form-group">
                                <div class="col-md-12">
                                    Ваш логин: <b>{{$user->login}}</b>
                                </div>
                            </div>
                            <hr/>
                            <div class="form-group">
                                <div class="col-md-12">
                                    Ваше имя:
                                    <input type="text" class="form-control" id="name" name="name"
                                           placeholder="Имя (например, ФИО)" value="{{$user->name}}">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-12">
                                    Ваша электронная почта:
                                    <input type="email" class="form-control" id="email" name="email"
                                           placeholder="Электронная почта" value="{{$user->email}}">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-12">
                                    Расскажите о себе:
                                    <input type="text" class="form-control" id="about" name="about"
                                           placeholder="О себе" value="{{$user->about}}">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-12">
                                    Ваш пароль:
                                    <input type="password" class="form-control" id="password" name="password"
                                           placeholder="Пароль">
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-md-12">
                                    Аватар:
                                    <input type="file" class="" id="image" name="avatar">
                                </div>
                            </div>
                            <button type="submit" class="btn send-btn">Сохранить</button>

                        </form>
                    </div>
                </div>
                @include('main.blog._sidebar')
            </div>
        </div>
    </div>
@endsection
