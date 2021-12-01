@extends('main.blog.layout')

@section('content')
    <div class="main-content">
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <article class="post shadow-lg">
                        <div class="post-thumb" style="border: 35px solid white">
                            @if(Auth::check() and Auth::user()->id == 1)
                                <p><a href="{{route('posts.edit', $post->id)}}" class="fa fa-pencil"
                                      style="color: black; float: right"> Изменить пост</a></p>
                            @endif
                            <a href="{{route('post.show', $post->slug)}}"><img src="{{$post->getImage()}}"
                                                                               style="object-fit: scale-down;"
                                                                               alt="{{$post->slug}}"></a>
                        </div>
                        <div class="post-content">
                            <header class="entry-header text-center text-uppercase">
                                @if($post->hasCategory())
                                    <h6>
                                        <a href="{{route('category.show', $post->category->slug)}}"> {{$post->getCategoryTitle()}}</a>
                                    </h6>
                                @else
                                    <span>Без категории</span>
                                @endif
                                <h1 class="entry-title"><a
                                        href="{{route('post.show', $post->slug)}}">{{$post->title}}</a></h1>
                            </header>
                            <div class="entry-content">
                                {!! $post->description !!}
                                {!! $post->content !!}
                                <p>&nbsp;</p>
                            </div>
                            <div class="decoration">
                                @foreach($post->tags as $tag)
                                    <a href="{{route('tag.show', $tag->slug)}}"
                                       class="btn btn-default">{{$tag->title}}</a>
                                @endforeach
                            </div>
                            <div class="social-share">
							<span
                                class="social-share-title pull-left">Автор: {{$post->author->login}} | {{Date::parse($post->created_at)->format('d F Y г. | H:i')}}</span>
                                <ul class="text-center pull-right">
                                    <li><a class="s-vk" href="#"><i class="fa fa-vk"></i></a></li>
                                    <li><a class="s-instagram" href="#"><i class="fa fa-instagram"></i></a></li>
                                    <li><a class="s-youtube" href="#"><i class="fa fa-youtube-play"></i></a></li>
                                    <li><a class="s-twitter" href="#"><i class="fa fa-twitter"></i></a></li>
                                </ul>
                                <p>&nbsp;</p>
                            </div>
                        </div>
                    </article>
                    <div class="about row align-items-center">
                        <div class="pull-left img-circle avatar"
                             style="background-image: url({{$post->author->getImage()}})">
                        </div>
                        Об авторе:
                        <h4>{{$post->author->name}}</h4>
                        @if($post->author->about)
                            <p>{{$post->author->about}}</p><br/>
                        @endif
                        <hr/>
                        <span
                            style="float: right">Дата регистрации: {{Date::parse($post->author->created_at)->format('d F Y г. | H:i')}}</span>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            @if($post->hasPrevious())
                                <div class="single-blog-box">
                                    <a href="{{route('post.show', $post->getPrevious()->slug)}}">
                                        <img src="{{$post->getPrevious()->getImage()}}"
                                             alt="{{$post->getPrevious()->slug}}" style="height: 220px;">
                                        <div class="overlay">
                                            <div class="promo-text">
                                                <p><i class=" pull-left fa fa-angle-left"></i></p>
                                                <h5>{{$post->getPrevious()->title}}</h5>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            @endif
                        </div>
                        <div class="col-md-6">
                            @if($post->hasNext())
                                <div class="single-blog-box">
                                    <a href="{{route('post.show', $post->getNext()->slug)}}">
                                        <img src="{{$post->getNext()->getImage()}}" alt="{{$post->getNext()->slug}}"
                                             style="height: 220px;">
                                        <div class="overlay">
                                            <div class="promo-text">
                                                <p><i class=" pull-right fa fa-angle-right"></i></p>
                                                <h5>{{$post->getNext()->title}}</h5>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            @endif
                        </div>
                    </div>
                    <div class="related-post-carousel">
                        <div class="related-heading">
                            <h4>Вам также могут понравиться: </h4>
                        </div>
                        <div class="items">
                            @foreach($post->related() as $item)
                                <div class="single-item" style="border: 5px solid white; object-fit: cover;">
                                    <a href="{{route('post.show', $item->slug)}}">
                                        <img
                                            style="min-width: 150px; min-height: 150px; max-height: 150px; object-fit: cover"
                                            src="{{$item->getImage()}}"
                                            alt="Обложка поста">
                                        <p>{{Str::limit($item->title, '30')}}</p>
                                    </a>
                                </div>
                            @endforeach
                        </div>
                    </div>
                    <div id="comments" class="leave-comment">
                        <h3>Комментарии</h3>
                        <hr/>
                        @if (!$post->comments->isEmpty())
                            @foreach($post->getComments() as $comment)
                                <div id="getComment">
                                    <b>#{{$loop->index + 1}}</b>
                                    <div class="pull-left img-circle avatar"
                                         style="background-image: url({{$comment->author->getImage()}})">
                                    </div>
                                    <div class="comment-text">
                                        @if(Auth::user())
                                            @if($comment->user_id == Auth::user()->id or Auth::user()->id == 1)
                                                {{Form::open(['route'=>['commentsUser.destroy', $comment->id], 'method'=>'delete'])}}
                                                <button class="deleteComment replay btn pull-right"
                                                        onclick="return confirm('Вы уверены, что хотите удалить комментарий?')"
                                                        type="submit">Удалить
                                                </button>
                                                {{Form::close()}}
                                            @endif
                                        @endif
                                        <input type="hidden">
                                        <p class="comment-date">
                                            {{$comment->created_at->format('d. m. Y | h:m')}}
                                        </p>
                                        <h5>{{$comment->author->name}}</h5>
                                        <hr/>
                                        <div style="padding-left: 10px;">
                                            <p>{{$comment->text}}</p>
                                        </div>
                                    </div>
                                    <hr/>
                                </div>
                            @endforeach
                        @else
                            <p>Комментариев пока нет...</p>
                        @endif
                    </div>
                    @if(Auth::check())
                        <div class="leave-comment">
                            <h4 class="pull-left">Оставить комментарий</h4>
                            <h4 class="pull-right">Всего комментариев: {{ count($post->getComments()) }}</h4>
                            <form class="sendComment form-horizontal contact-form" role="form" method="post"
                                  action="/blog/comment">
                                {{csrf_field()}}
                                <input type="hidden" name="post_id" value="{{$post->id}}">
                                <div class="form-group">
                                    <div class="col-md-12">
                                        <textarea style="resize: none" class="comment form-control" rows="6"
                                                  name="message" placeholder="Комментарий"></textarea>
                                    </div>
                                </div>
                                <button class="btn send-btn">Отправить</button>
                            </form>
                        </div>
                    @else
                        <div class="leave-comment">
                            <h4>Чтобы оставлять комментарии, пожалуйста, <a
                                    style="color:black; text-decoration: underline;"
                                    href="/auth/login">авторизуйтесь.</a></h4>
                        </div>
                    @endif
                </div>
                @include('main.blog._sidebar')
            </div>
        </div>
    </div>
@endsection
