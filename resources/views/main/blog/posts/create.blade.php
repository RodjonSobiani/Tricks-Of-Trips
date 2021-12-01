@extends('main.blog.layout')

@section('content')
    @if(Auth::check())
    <div class="main-content">
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <article class="post shadow-lg">

                        <div class="post-thumb" style="border: 35px solid white">
                            <section class="text-center">
                                <h1>
                                    Добавить пост
                                    <small></small>
                                </h1>
                            </section>
                        </div>
                        <form class="form-horizontal contact-form" role="form" method="post" action="/blog/create" enctype="multipart/form-data">

                        <div class="post-content">
                            <div class="box">
                                <div class="box-body">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="title">Название</label>
                                            <input type="text" class="form-control" id="title"
                                                   name="title" value="{{old('title')}}" placeholder="">
                                        </div>

                                        <div class="form-group">
                                            <label for="exampleInputFile">Лицевая картинка</label>
                                            <input type="file" name="image" id="cover">

                                            <p class="help-block">jpg, jpeg, png, bmp, gif, svg, или webp</p>
                                        </div>
                                        <div class="featurePost form-group">
                                            <label>
                                                <input type="checkbox" class="minimal" name="is_featured">
                                            </label>
                                            <label>
                                                Рекомендовать
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="postDescription">Описание</label>
                                            <textarea name="description" id="postDescription" cols="30" rows="10"
                                                      class="form-control">{{old('description')}}</textarea>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="summernote">Полный текст</label>
                                            <textarea name="content" id="summernote" cols="30" rows="10"
                                                      class="form-control"></textarea>
                                        </div>
                                    </div>

                                </div>

                            </div>


                        </div>
                        <div class="post-thumb" style="border: 35px solid white">
                            <div class="text-center">
                                <button class="addPost btn btn-info">Добавить</button>
                                <a href="{{route('posts.index')}}" class="btn btn-default">Назад</a>
                            </div>
                        </div>
                        </form>
                    </article>
                </div>
                @include('main.blog._sidebar')
            </div>
        </div>
    </div>

    @else()

        <div class="main-content">
            <div class="container">
                <div class="row">
                    <div class="col-md-8">
                        <article class="post">

                            <div class="leave-comment">
                                <p>Чтобы добавлять новые посты, пожалуйста, <a style="color:black; text-decoration: underline;" href="/auth/login">авторизуйтесь.</a></p>
                            </div>

                        </article>
                    </div>
                    @include('main.blog._sidebar')
                </div>
            </div>
        </div>
    @endif()

@endsection
