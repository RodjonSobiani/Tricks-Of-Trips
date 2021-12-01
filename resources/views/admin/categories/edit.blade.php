@extends('admin.layout')
@section('content')
    <div class="content-wrapper">
        <section class="content-header"><h1>Добавить категорию</h1></section>
        <section class="content">
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">Меняем категорию</h3>
                </div>
                <div class="box-body">
                    @include('admin.errors')
                    {{Form::open(['route'=>['categories.update', $category->id], 'method'=>'put'])}}
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="categoryTitle">Название</label>
                            <input type="text" class="form-control" id="categoryTitle" name="title" placeholder=""
                                   value="{{$category->title}}">
                        </div>
                    </div>
                </div>
                <div class="box-footer">
                    <a href="{{route('categories.index')}}" class="btn btn-default">Назад</a>
                    <button class="btn btn-warning pull-right">Изменить</button>
                </div>
                {{Form::close()}}
            </div>
        </section>
    </div>
@endsection
