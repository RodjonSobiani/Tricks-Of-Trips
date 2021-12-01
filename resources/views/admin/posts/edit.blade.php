@extends('admin.layout')
@section('content')
    <div class="content-wrapper">
        <section class="content-header">
            <h1>Посты</h1>
        </section>
        <section class="content">
            {{Form::open([
                'route' => ['posts.update', $post->id],
                'files' => true,
                'method' => 'put'
            ])}}
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">Изменение поста</h3>
                </div>
                <div class="box-body">
                    @include('admin.errors')
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="adminPostTitle">Название</label>
                            <input type="text" class="form-control" id="adminPostTitle" placeholder=""
                                   value="{{$post->title}}" name="title">
                        </div>
                        <div class="form-group">
                            <img src="{{$post->getImage()}}" alt="Изображение к посту" class="img-responsive"
                                 width="200">
                            <label for="exampleInputFile">Обложка</label>
                            <input type="file" id="exampleInputFile" name="image">

                            <p class="help-block">jpg, jpeg, png, bmp, gif, svg, или webp</p>
                        </div>
                        <div class="form-group">
                            <label>Категория</label>
                            {{Form::select('category_id',
                                $categories,
                                $post->getCategoryID(),
                                ['class' => 'form-control select2'])
                            }}
                        </div>
                        <div class="form-group">
                            <label>Теги</label>
                            {{Form::select('tags[]',
                                $tags,
                                $selectedTags,
                                ['class' => 'form-control select2', 'multiple'=>'multiple',
                                'data-placeholder'=>' Выберите теги'])
                            }}
                        </div>
                        {{--                        <div class="form-group">--}}
                        {{--                            <label>Дата:</label>--}}
                        {{--                            <div class="input-group date">--}}
                        {{--                                <div class="input-group-addon">--}}
                        {{--                                    <i class="fa fa-calendar"></i>--}}
                        {{--                                </div>--}}
                        {{--                                <input type="text" class="form-control pull-right"--}}
                        {{--                                       id="datepicker" value="{{$post->date}}" name="date">--}}
                        {{--                            </div>--}}
                        {{--                        </div>--}}
                        <div class="form-group">
                            <label>
                                {{Form::checkbox('is_featured', '1', $post->is_featured, ['class' => 'minimal'])}}
                            </label>
                            <label>Рекомендовать</label>
                        </div>
                        <div class="form-group">
                            <label>
                                <label>
                                    {{Form::checkbox('status', '1', $post->status, ['class' => 'minimal'])}}
                                </label>
                            </label>
                            <label>Черновик</label>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="adminPostDescription">Описание</label>
                            <textarea name="description" id="adminPostDescription" cols="30" rows="10"
                                      class="form-control">{{$post->description}}</textarea>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="summernote">Полный текст</label>
                            <textarea name="content" id="summernote" cols="30" rows="10"
                                      class="form-control">{{$post->content}}</textarea>
                        </div>
                    </div>
                </div>
                <div class="box-footer">
                    <a href="{{route('posts.index')}}" class="btn btn-default">Назад</a>
                    <button class="btn btn-warning pull-right">Изменить</button>
                </div>
            </div>
            {{Form::close()}}
        </section>
    </div>
@endsection
