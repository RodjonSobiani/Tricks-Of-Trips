@extends('admin.layout')

@section('content')

    <div class="content-wrapper">

        <section class="content-header">
            <h1>Подписчики</h1>
        </section>

        <section class="content">
        {{Form::open(['route' => 'subscribers.store'])}}
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">Управление подписчиками</h3>
                </div>
                <div class="box-body">
                    @include('admin.errors')
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="subsMail">Email</label>
                            <input type="text" class="form-control" id="subsMail" placeholder="" name="email"
                                   value="{{old('email')}}">
                        </div>
                    </div>
                </div>
                <div class="box-footer">
                    <a href="{{route('subscribers.index')}}" class="btn btn-default">Назад</a>
                    <button class="btn btn-success pull-right">Добавить</button>
                </div>
            </div>
            {{Form::close()}}
        </section>
@endsection
