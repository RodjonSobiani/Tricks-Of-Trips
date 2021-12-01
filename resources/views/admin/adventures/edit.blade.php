@extends('admin.layout')

@section('content')
    <div class="content-wrapper">
        <section class="content-header">
            <h1>
                Изменение приключения
                <small></small>
            </h1>
        </section>
        <section class="content">
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">Меняем приключение</h3>
                    @include('admin.errors')
                </div>
                <div class="box-body">
                    {{Form::open(['route'=>['adventures.update', $adventure->id], 'method'=>'put'])}}
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="Title">Название</label>
                            <input type="text" class="form-control" id="Title" name="title" placeholder=""
                                   value="{{$adventure->title}}">
                        </div>
                        <div class="form-group">
                            <label for="Content">Описание</label>
                            <input type="text" class="form-control" id="Content" name="Content" placeholder=""
                                   value="{{$adventure->content}}">
                        </div>
                    </div>
                </div>
                <div class="box-footer">
                    <button class="btn btn-default">Назад</button>
                    <button class="btn btn-warning pull-right">Изменить</button>
                </div>
                {{Form::close()}}
            </div>
        </section>
    </div>
@endsection
