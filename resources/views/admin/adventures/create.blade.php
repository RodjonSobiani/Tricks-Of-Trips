@extends('admin.layout')

@section('content')
    <div class="content-wrapper">
        <section class="content-header">
            <h1>
                Добавить приключение
            </h1>
        </section>
        <section class="content">
            {!! Form::open(['route' => 'adventures.store']) !!}
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">Добавляем приключение</h3><br/>
                    @include('admin.errors')
                </div>
                <div class="box-body">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Название</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" placeholder="" name="title">
                        </div>
                    </div>
                </div>
                <div class="box-footer">
                    <button class="btn btn-default">Назад</button>
                    <button class="btn btn-success pull-right">Добавить</button>
                </div>
                {!! Form::close() !!}
            </div>
        </section>
    </div>
@endsection
