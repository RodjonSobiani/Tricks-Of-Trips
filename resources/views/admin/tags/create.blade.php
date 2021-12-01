@extends('admin.layout')

@section('content')
    <div class="content-wrapper">
        <section class="content-header">
            <h1>Тэги</h1>
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i>Главная</a></li>
                <li class="active">Тэги</li>
            </ol>
        </section>
        <section class="content">
            {!! Form::open(['route' => 'tags.store']) !!}
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">Управление тегами</h3><br/>
                </div>
                <div class="box-body">
                    @include('admin.errors')
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="tagTitle">Название</label>
                            <input type="text" class="form-control" id="tagTitle" placeholder="" name="title">
                        </div>
                    </div>
                </div>
                <div class="box-footer">
                    <a href="{{route('tags.index')}}" class="btn btn-default">Назад</a>
                    <button class="btn btn-success pull-right">Добавить</button>
                </div>
                {!! Form::close() !!}
            </div>
        </section>
    </div>
@endsection
