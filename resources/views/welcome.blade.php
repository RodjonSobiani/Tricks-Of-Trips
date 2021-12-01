<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8"/>
    <meta name="robots" content="noindex, nofollow">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RedjeeTrips - Приключения на любой вкус</title>
    <link rel="icon" type="image/png" href="favicon.ico">
    @include('styles')
</head>
<body class="container-fluid">
<div class="header sticky-top">
    <div class="menu row align-items-center">
        <nav class="p-5">
            <a class="px-3" href="#fbsection1" class="cbp-fbcurrent">Приключения начинаются здесь</a>
            <a class="px-3" href="#fbsection2">Исследуйте мир с интересом</a>
            <a class="px-3" href="#fbsection3">Участвуйте в увлекательных конкурсах</a>
            <a class="px-3" href="#fbsection4">Создавайте собственные приключения</a>
            <a class="px-3" href="#fbsection5">Присоединяйтесь!</a>
        </nav>
    </div>
    <div class="menu row align-items-center float-end menu-auth">
        @if(Auth::check())
            <div class="float-end">
                <a class="btn btn-sm btn-warning" href="/blog/profile" role="button">Мой профиль</a>
                <a class="btn btn-sm btn-outline-secondary" href="/auth/logout" role="button">Выход</a>
            </div>
        @else
            <div class="float-end">
                <a class="btn btn-sm btn-warning" href="/auth/register" role="button">Регистрация</a>
                <a class="btn btn-sm btn-warning" href="/auth/login">Вход</a>
            </div>
        @endif
    </div>
</div>
<div class="containerfb text-white">
    <div id="cbp-fbscroller" class="cbp-fbscroller">
        <nav class="rightNav">
            <a href="#fbsection1" class="cbp-fbcurrent"></a>
            <a href="#fbsection2"></a>
            <a href="#fbsection3"></a>
            <a href="#fbsection4"></a>
            <a href="#fbsection5"></a>
            <a href="#svg-map"></a>
            <a href="#footer"></a>
        </nav>
        <section id="fbsection1">
            <div class="fltr row align-items-center">
                <div class="content vvc">
                    <div id="content1" class="text-center vvc text-uppercase">
                        <h1 class="text-ver">Приключения начинаются здесь</h1>
                    </div>
                </div>
            </div>
        </section>
        <section id="fbsection2">
            <div class="fltr">
                <header>
                    <nav class="navbar">
                        <p></p>
                    </nav>
                </header>
                <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0"
                                aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" class="active"
                                aria-current="true"
                                aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2"
                                aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner">
                        <div class="carousel-item">
                            <div class="container">
                                <div class="carousel-caption text-start">
                                    <h1>Выбирайте приключения на свой вкус</h1>
                                    <p>Приключения гораздо ближе, чем кажется. Они повсюду.</p>
                                    <p><a class="btn btn-lg btn-warning" href="#svg-map">Выбрать регион</a></p>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item active">
                            <div class="container">
                                <div class="carousel-caption">
                                    <h1>Создавайте собственные приключения</h1>
                                    <p>Пусть люди увидят ваши любимые места</p>
                                    <p><a class="btn btn-lg btn-warning" href="/auth/register">Присоединиться</a></p>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="container">
                                <div class="carousel-caption text-end">
                                    <h1>Оставляйте свои отзывы и комментарии</h1>
                                    <p>Ваш опыт имеет большое значение</p>
                                    <p><a class="btn btn-lg btn-warning" href="/blog">Посмотреть</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel"
                            data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Предыдущий</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#myCarousel"
                            data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Следующий</span>
                    </button>
                </div>
                <div class="container marketing">
                    <div class="row ">
                        <div class="col-lg-4">
                            <img src="/images/ins-1.jpg" alt="Узнавайте" class="round">
                            <h2>Узнавайте</h2>
                            <p>Изучив наш путеводитель, вы найдёте много полезной информации, которая пригодится вам в
                                любом приключении!</p>
                            <p><a class="btn btn-warning" href="/blog">Подробнее &raquo;</a></p>
                        </div>
                        <div class="col-lg-4">
                            <img src="/images/ins-2.jpg" alt="Путешествуйте" class="round">
                            <h2>Путешествуйте</h2>
                            <p>Давно мечтали отправиться в приключение? Знакомьтесь с информацией на сайте и участвуйте
                                в различных конкурсах. Путешествуя!</p>
                            <p><a class="btn btn-warning" href="/blog">Подробнее &raquo;</a></p>
                        </div>
                        <div class="col-lg-4">
                            <img src="/images/ins-3.jpg" alt="Добавляйте" class="round">
                            <h2>Добавляйте</h2>
                            <p>Есть что рассказать? Огромное количество пользователей по всей стране с удовольствием
                                прочитает Вашу историю или повторит Ваш маршрут!</p>
                            <p><a class="btn btn-warning" href="/blog">Подробнее &raquo;</a></p>
                        </div>
                    </div>
                    <hr class="featurette-divider">
                </div>
            </div>
        </section>
        <section id="fbsection3">
            <div class="fltr row align-items-center">
                <div class="container marketing">
                    <hr class="featurette-divider"/>
                    <div class="row featurette">
                        <div class="col-md-7">
                            <h2 class="featurette-heading">Выбирайте самые интересные места
                                <hr/>
                                <small><span
                                        class="text-white">...они навсегда останутся в Ваших воспоминаниях</span></small>
                                <hr/>
                            </h2>
                            <p class="lead">Приключения любого уровня сложности</p>
                        </div>
                        <div class="col-md-5">
                            <img src="/images/ins-4.jpg" alt="Выбирайте" class="square">
                        </div>
                    </div>
                    <hr class="featurette-divider"/>
                </div>
            </div>
        </section>

        <section id="fbsection4">
            <div class="fltr row align-items-center">
                <div class="container marketing">
                    <hr class="featurette-divider"/>
                    <div class="row featurette">
                        <div class="col-md-5">
                            <img src="/images/ins-5.jpg" alt="Insta Image #5" class="square">
                        </div>
                        <div class="col-md-7 order-md-2">
                            <h2 class="featurette-heading">Участвуйте в конкурсах и выигрывайте призы
                                <hr/>
                                <small><span class="text-white">Всё для самостоятельных путешествий</span></small>
                                <hr/>
                            </h2>
                            <p class="lead">Есть предложение для конкурса? Отлично! О призах мы позаботимся сами</p>
                        </div>
                    </div>
                    <hr class="featurette-divider"/>
                </div>
            </div>
        </section>

        <section id="fbsection5">
            <div class="fltr row align-items-center">
                <div class="container marketing">
                    <hr class="featurette-divider"/>
                    <div class="row featurette">
                        <div class="col-md-7">
                            <h2 class="featurette-heading">Следите за точками на карте местности
                                <hr/>
                                <small><span class="text-white">Возможно, кто-то оставил Вам подарок</span></small>
                                <hr/>

                            </h2>
                            <p class="lead">И да, таких точек много!</p>
                        </div>
                        <div class="col-md-5">
                            <img src="/images/ins-6.jpg" alt="Insta Image #6" class="square">
                        </div>
                    </div>
                    <hr class="featurette-divider"/>
                </div>
            </div>
        </section>

        <section id="svg-map">
            <div class="container-fluid">
                @include('map')
            </div>
        </section>
        <section id="footer">
            <div class="footer">
                @include('table')
                @include('footer')
            </div>
        </section>
        <div class="navbar-fixed-bottom row-fluid">
            <div class="info-block row align-items-center text-center">
                <span>В связи с распространением коронавируса, пожалуйста, ознакомьтесь с <b><a href="#">данной</a></b> информацией.</span>
            </div>
        </div>
    </div>
@include('scripts')
</body>
</html>
