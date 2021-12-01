@extends('admin.layout')
@section('content')
    <div class="content-wrapper">
        <section class="content-header"><h1>Пользователи</h1></section>

        <section class="content">
            {{Form::open([
                'route' => ['users.update', $user->id],
                'method' => 'put',
                'files' => true
                ])}}
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">Изменения пользователя <b>{{$user->login}}</b></h3>
                </div>
                <div class="box-body">
                    @include('admin.errors')
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="login">Логин</label>
                            <input type="text" class="form-control" id="login"
                                   name="login" placeholder=""
                                   value="{{$user->login}}">
                        </div>
                        <div class="form-group">
                            <label for="name">Имя</label>
                            <input type="text" class="form-control" id="name"
                                   name="name" placeholder=""
                                   value="{{$user->name}}">
                        </div>
                        <div class="form-group">
                            <label for="email">E-mail</label>
                            <input type="text" class="form-control" id="email"
                                   name="email" placeholder=""
                                   value="{{$user->email}}">
                        </div>
                        <div class="form-group">
                            <label for="about">О себе</label>
                            <input type="text" name="about" class="form-control" id="about"
                                   placeholder="" value="{{$user->about}}">
                        </div>
                        <div class="form-group">
                            <label for="password">Пароль</label>
                            <input type="password" class="form-control" id="password"
                                   name="password" placeholder="">
                        </div>
                        <div class="form-group">
                            <img src="{{$user->getImage()}}" alt="Аватар" width="200" class="img-responsive">
                            <label for="exampleInputFile">Аватар</label>
                            <input type="file" name="avatar" id="exampleInputFile">

                            <p class="help-block">jpg, jpeg, png, bmp, gif, svg, или webp</p>
                        </div>
                    </div>
                </div>
                <div class="box-footer">
                    <a href="{{route('users.index')}}" class="btn btn-default">Назад</a>
                    <button class="btn btn-warning pull-right">Изменить</button>
                </div>
            </div>
            {{Form::close()}}
        </section>
    </div>
@endsection
