<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loan-Approval</title>
    <!-- favicons Icons -->
    <link rel="apple-touch-icon" sizes="180x180" href="resource/oe/assets1/images/favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="resource/oe/assets1/images/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="resource/oe/assets1/images/favicons/favicon-16x16.png">
    <meta name="description" content="Pylon Loan HTML Template">

    <!-- fonts -->

    <link rel="stylesheet" href="resource/oe/assets1/css/bootstrap.min.css">
    <link rel="stylesheet" href="resource/oe/assets1/css/fontawesome-all.min.css">
    <link rel="stylesheet" href="resource/oe/assets1/css/swiper.min.css">
    <link rel="stylesheet" href="resource/oe/assets1/css/animate.min.css">
    <link rel="stylesheet" href="resource/oe/assets1/css/pylon-icons.css">
    <link rel="stylesheet" href="resource/oe/assets1/css/odometer.min.css">
    <link rel="stylesheet" href="resource/oe/assets1/css/magnific-popup.css">
    <link rel="stylesheet" href="resource/oe/assets1/css/bootstrap-select.min.css">
    <link rel="stylesheet" href="resource/oe/assets1/css/nouislider.min.css">
    <link rel="stylesheet" href="resource/oe/assets1/css/nouislider.pips.css">
    <link rel="stylesheet" type="text/css" href="resource/oe/assets1/css/flaticon.css">

    <!-- template styles -->
    <link rel="stylesheet" href="resource/oe/assets1/css/main.css">
</head>

<body>
    <div class="preloader">
        <img class="preloader__image" src="resource/oe/assets1//images/loader.png" alt="">
    </div><!-- /.preloader -->
    <div class="page-wrapper">
        <header class="main-header">
            <div class="topbar">
                <div class="container">
                    <ul class="topbar__left">
                        <li class="topbar__social">
                            <a href="#" class="fab fa-facebook-square"></a>
                            <a href="#" class="fab fa-twitter"></a>
                            <a href="#" class="fab fa-pinterest-p"></a>
                            <a href="#" class="fab fa-instagram"></a>
                        </li><!-- /.topbar__social -->
                        <li class="dropdown"><a href="#dropdownMenuButton1" class="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Login</a>
                        	<div class="dropdown-menu headerLoginBox" aria-labelledby="navbarDropdown">
                        	<form role="form" action="login" method="post" name="loginForm" onsubmit="return validateForm()">
                                    <div class="form-group">
                                        <label for="uname" class="control-label">User Name:</label>
                                        <div class="input-icon">
                                            <input name="uname" id="uname" type="text" placeholder="Username" class="form-control email" >
                                             <i class="fa fa-user"></i>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="passwd" class="control-label">Password:</label>
                                        <div class="input-icon">
                                            <input type="password" class="form-control" placeholder="Password" name="passwd" id="passwd" >
                                             <i class="fa fa-lock"></i>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <input type="submit" value="Login" class="btn btn-primary  btn-block"/>
                                    </div>
                                    <p class="mb-0"><a href="#">Forgot Password?</a></p>
                                </form>
                        	</div>                        
                        </li>
                        <li><a href="news.html">Company News</a></li>
                        <li><a href="faq.html">FAQs</a></li>
                    </ul>
                    <!-- /.topbar__left -->
                    <div class="topbar__right">
                        <a href="#"><i class="pylon-icon-email1"></i>needhelp@loan.com</a>
                        <a href="#"><i class="pylon-icon-clock2"></i>Mon - Sat 8:00 AM - 6:00 PM</a>
                    </div><!-- /.topbar__right -->
                </div><!-- /.container -->
            </div><!-- /.topbar -->
            <nav class="main-menu">
                <div class="container">
                    <div class="logo-box">
                        <a href="index-2.html" aria-label="logo image"><img src="resource/oe/assets1/images/logo-dark.png" width="155" alt=""></a>
                        <span class="fa fa-bars mobile-nav__toggler"></span>
                    </div><!-- /.logo-box -->
                    <ul class="main-menu__list">
                        <li class="dropdown">
                            <a href="#">Home</a>
                            <ul>    
                                <li>
                                    <a href="#">Nav One</a>
                                </li>
                                <li><a href="#">Nav Two</a></li>
                                <li class="dropdown">
                                    <a href="#">Nav Styles</a>
                                    <ul>
                                        <li><a href="#">Nav One</a></li>
                                        <li><a href="#">Nav Two</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a href="#">About Us</a>
                            <ul>
                                <li><a href="#">Team</a></li>
                                <li><a href="#">Team Details</a></li>
                            </ul>
                        </li>
                        <li class="dropdown"><a href="#">Service</a>
                            <ul>
                                <li><a href="#">Service</a></li>
                                <li><a href="#">Service Two</a></li>
                                <li><a href="#">Service Details</a></li>
                            </ul>
                        </li>
                        <li class="dropdown"><a href="#">Page</a>
                            <ul>
                                <li><a href="#">How It Works</a></li>
                                <li><a href="#">Loan Calculator</a></li>
                                <li><a href="#">Loan Eligibility</a></li>
                                <li><a href="#">Apply Now</a></li>
                                <li class="dropdown">
                                    <a href="#">Credit Card</a>
                                    <ul>
                                        <li><a href="#">Credit Card</a></li>
                                        <li><a href="#">Credit Card Details</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">Testimonials</a></li>
                            </ul>
                        </li>
                        <li class="dropdown"><a href="#">News</a>
                            <ul>
                                <li><a href="#">News</a></li>
                                <li><a href="#">News Details</a></li>
                                <li><a href="#">News Default</a></li>
                            </ul>
                        </li>
                        <li><a href="#">Contact Us</a></li><!-- 
                        <li class="search-btn search-toggler">
                            <a href="#"><i class="pylon-icon-magnifying-glass"></i></a>
                        </li> -->
                    </ul>
                    <!-- /.main-menu__list -->

                    <div class="main-header__info">
                        <div class="main-header__info-phone">
                            <i class="pylon-icon-tech-support"></i>
                            <div class="main-header__info-phone-content">
                                <span>Call Anytime</span>
                                <h3><a href="tel:+19812310000">+1 9812310000</a></h3>
                            </div><!-- /.main-header__info-phone-content -->
                        </div><!-- /.main-header__info-phone -->
                    </div><!-- /.main-header__info -->
                </div><!-- /.container -->
            </nav>
            <!-- /.main-menu -->
        </header><!-- /.main-header -->

        <div class="stricky-header stricked-menu main-menu">
            <div class="sticky-header__content"></div><!-- /.sticky-header__content -->
        </div><!-- /.stricky-header -->

        <section class="main-slider">
            <div class="swiper-container thm-swiper__slider" data-swiper-options='{
        "slidesPerView": 1,
        "loop": true,
        "effect": "fade",
        "autoplay": {
            "delay": 5000
        },
        "navigation": {
            "nextEl": "#main-slider__swiper-button-next",
            "prevEl": "#main-slider__swiper-button-prev"
        }
    }'>
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <div class="image-layer" style="background-image: url(resource/oe/assets1/images/main-slider/main-slider-1-1.jpg);"></div>
                        <!-- /.image-layer -->
                        <div class="container">
                            <div class="row">
                                <div class="col-xl-6 col-lg-6">
                                    <p>Simple & Secure Payment Process</p>
                                    <h2>Connecting Your Loan
                                        Needs</h2>
                                    <a href="apply-now.html" class=" thm-btn">Apply For Loan</a>
                                    <!-- /.thm-btn dynamic-radius -->
                                </div><!-- /.col-lg-7 text-right -->
                            </div><!-- /.row -->
                        </div><!-- /.container -->
                    </div><!-- /.swiper-slide -->
                    <div class="swiper-slide">
                        <div class="image-layer" style="background-image: url(resource/oe/assets1/images/main-slider/main-slider-1-2.jpg);"></div>
                        <!-- /.image-layer -->
                        <div class="container">
                            <div class="row">
                                <div class="col-xl-6 col-lg-6">
                                    <p>Simple & Secure Payment Process</p>
                                    <h2>Connecting Your Loan
                                        Needs</h2>
                                    <a href="apply-now.html" class=" thm-btn">Apply For Loan</a>
                                    <!-- /.thm-btn dynamic-radius -->
                                </div><!-- /.col-lg-7 text-right -->
                            </div><!-- /.row -->
                        </div><!-- /.container -->
                    </div><!-- /.swiper-slide -->
                    <div class="swiper-slide">
                        <div class="image-layer" style="background-image: url(resource/oe/assets1/images/main-slider/main-slider-1-1.jpg);"></div>
                        <!-- /.image-layer -->
                        <div class="container">
                            <div class="row">
                                <div class="col-xl-6 col-lg-6">
                                    <p>Simple & Secure Payment Process</p>
                                    <h2>Connecting Your Loan
                                        Needs</h2>
                                    <a href="apply-now.html" class=" thm-btn">Apply For Loan</a>
                                    <!-- /.thm-btn dynamic-radius -->
                                </div><!-- /.col-lg-7 text-right -->
                            </div><!-- /.row -->
                        </div><!-- /.container -->
                    </div><!-- /.swiper-slide -->
                </div><!-- /.swiper-wrapper -->

                <!-- If we need navigation buttons -->
                <div class="main-slider__nav">
                    <div class="swiper-button-prev" id="main-slider__swiper-button-next"><i class="pylon-icon-left-arrow"></i></div>
                    <div class="swiper-button-next" id="main-slider__swiper-button-prev"><i class="pylon-icon-right-arrow"></i></div>
                </div><!-- /.main-slider__nav -->

            </div><!-- /.swiper-container thm-swiper__slider -->
            <div class="feature-two">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-7">
                            <div class="row">
                                <div class="col-lg-6 col-md-6 wow fadeInUp" data-wow-duration="1500ms">
                                    <div class="feature-two__box">
                                        <i class="pylon-icon-consumer-behavior"></i>
                                        <p>Quick Payment
                                            Process</p>
                                    </div><!-- /.feature-two__box -->
                                </div><!-- /.col-lg-4 col-md-6 -->
                                <div class="col-lg-6 col-md-6 wow fadeInUp" data-wow-duration="1500ms">
                                    <div class="feature-two__box">
                                        <i class="pylon-icon-point-of-sale"></i>
                                        <p>No Prepayment
                                            Fees</p>
                                    </div><!-- /.feature-two__box -->
                                </div><!-- /.col-lg-4 col-md-6 -->
                            </div>    
                        </div>    
                    </div><!-- /.row -->
                </div><!-- /.container -->
            </div><!-- /.feature-two -->
        </section><!-- /.main-slider -->

        <section class="about-one">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-xl-7">
                        <div class="about-one__content">
                            <div class="block-title text-left">
                                <p>Company Introductions</p>
                                <h2>Our Loans will Fill Your Dreams Come True</h2>
                            </div><!-- /.block-title -->
                            <p>There are many variations of passages of lorem ipsum available the majority have suffered alteration in some form by injected humour. Duis aute irure dolor lipsum is simply free text available in the local markets in reprehenderit.Nam aliquam sem et tortor consequat mattis pellentesque semper tailored for specific uses and specific market segment.</p>

                        </div><!-- /.about-one__content -->
                        <div class="row">
                            <div class="col-md-6">
                                <div class="feature-four__box text-left"><!-- .feature-four__box -->
                                    <div class="feature-four__box-inner">

                                    <div class="feature-four__box-icon"><i class="flaticon flaticon-property-1"></i></div>
                                        <div class="feature-four__box-right">
                                            <h3>
                                                Award Winning
                                            </h3>
                                            <p>Finance categories winning more than 10 awards</p>
                                        </div>
                                    </div>
                                </div><!-- /.feature-four__box -->
                            </div>
                            <div class="col-md-6">
                                <div class="feature-four__box text-left"><!-- .feature-four__box -->
                                    <div class="feature-four__box-inner">
                                    <div class="feature-four__box-icon"><i class="flaticon flaticon-growth-1"></i></div>
                                        <div class="feature-four__box-right">
                                            <h3>                                        
                                                Certified Company
                                            </h3>
                                            <p>Approved Finance company to provide loans</p>
                                        </div>
                                    </div>
                                </div><!-- /.feature-four__box -->
                            </div>
                        </div>
                    </div><!-- /.col-lg-6 -->
                    <div class="col-lg-12 col-xl-5">
                        <form action="#" id="loan-calculator" data-interest-rate="15" class="about-one__form wow fadeInUp" data-wow-duration="1500ms">
                            <h3>How Much You Need</h3>
                            <div class="about-one__form-content">
                                <div class="input-box__top">
                                    <span><i class="fas fa-rupee-sign"></i>50000</span>
                                    <span><i class="fas fa-rupee-sign"></i>400000</span>
                                </div><!-- /.input-box__top -->
                                <div class="input-box">
                                    <div class="range-slider-count" id="range-slider-count"></div>
                                    <input type="hidden" value="" id="min-value-rangeslider-count">
                                    <input type="hidden" value="" id="max-value-rangeslider-count">
                                </div><!-- /.input-box -->
                                <div class="input-box__top">
                                    <span>3 M</span>
                                    <span>48 M</span>
                                </div><!-- /.input-box__top -->
                                <div class="input-box">
                                    <div class="range-slider-month" id="range-slider-month"></div>
                                    <input type="hidden" value="" id="min-value-rangeslider-month">
                                    <input type="hidden" value="" id="max-value-rangeslider-month">
                                </div><!-- /.input-box -->
                                
                                <p>
                                    <span>Pay Monthly</span>
                                    <b><i class="fas fa-rupee-sign"></i><i id="loan-monthly-pay"></i></b>
                                </p>
                                <p>
                                    <span>Term of Use</span>
                                    <b><i id="loan-month"></i> Months</b>
                                </p>
                                <p>
                                    <span>Total Pay Back</span>
                                    <b><i class="fas fa-rupee-sign"></i><i id="loan-total"></i></b>
                                </p>
                                <a href="apply-now.html" class="thm-btn">Apply For Loan</a>
                            </div><!-- /.about-one__from-content -->
                        </form><!-- /.about-one__form -->
                    </div><!-- /.col-lg-6 -->
                </div><!-- /.row -->
            </div><!-- /.container -->
        </section><!-- /.about-one -->

        <section class="service-one">
            <div class="container">
                <div class="block-title text-center">
                    <p>What We’re Offering</p>
                    <h2>All Loans Services</h2>
                </div><!-- /.block-title -->
                <div class="row">
                    <div class="col-lg-4">
                        <div class="service-one__card">
                            <div class="service-one__image">
                                <a href="service-details.html">
                                    <div class="post-thumbnail">
                                        <img src="resource/oe/assets1/images/services/services-1-1.png" alt="">
                                    </div>
                                </a>
                            </div><!-- /.service-one__image -->
                            <div class="service-one__content">
                                <a href="service-details.html">
                                    <div class="service-icon">
                                        <i class="flaticon-car-loan"></i>
                                    </div>
                                </a>
                                <h3><a href="service-details.html">Personal Loan</a></h3>
                                <p>There are many variations of passages of lorem ipsum available the majority have some.</p>
                                <a href="#" class="pylon-icon-right-arrow service-one__link"></a><!-- /.service-one__link -->
                            </div><!-- /.service-one__content -->
                        </div><!-- /.service-one__card -->
                    </div><!-- /.col-lg-4 -->
                    <div class="col-lg-4">
                        <div class="service-one__card">
                            <div class="service-one__image">
                               <a href="service-details.html">
                                    <div class="post-thumbnail">
                                        <img src="resource/oe/assets1/images/services/services-1-2.png" alt="">
                                    </div>
                                </a>
                            </div><!-- /.service-one__image -->
                            <div class="service-one__content">
                                <a href="service-details.html">
                                    <div class="service-icon">
                                        <i class="flaticon-online-money"></i>
                                    </div>
                                </a>
                                <h3><a href="service-details.html">Education Loan</a></h3>
                                <p>There are many variations of passages of lorem ipsum available the majority have some.</p>
                                <a href="#" class="pylon-icon-right-arrow service-one__link"></a>
                                <!-- /.service-one__link -->
                            </div><!-- /.service-one__content -->
                        </div><!-- /.service-one__card -->
                    </div><!-- /.col-lg-4 -->
                    <div class="col-lg-4">
                        <div class="service-one__card">
                            <div class="service-one__image">
                                <a href="service-details.html">
                                    <div class="post-thumbnail">
                                        <img src="resource/oe/assets1/images/services/services-1-3.png" alt="">
                                    </div>
                                </a>
                            </div><!-- /.service-one__image -->
                            <div class="service-one__content">
                                <a href="service-details.html">
                                    <div class="service-icon">
                                        <i class="flaticon-property-1"></i>
                                    </div>
                                </a> 
                                <h3><a href="service-details.html">Business Loan</a></h3>
                                <p>There are many variations of passages of lorem ipsum available the majority have some.</p>
                                <a href="#" class="pylon-icon-right-arrow service-one__link"></a><!-- /.service-one__link -->
                            </div><!-- /.service-one__content -->
                        </div><!-- /.service-one__card -->
                    </div><!-- /.col-lg-4 -->
                </div><!-- /.row -->
            </div><!-- /.container -->
        </section><!-- /.service-one -->

        <section class="feature-one">
            <img src="resource/oe/assets1/images/shapes/feature-shape-1-1.png" alt="" class="feature-one__shape-1">
            <img src="resource/oe/assets1/images/shapes/feature-shape-1-2.png" alt="" class="feature-one__shape-2">
            <img src="resource/oe/assets1/images/shapes/feature-shape-1-3.png" alt="" class="feature-one__shape-3">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="block-title text-left">
                            <p>Get to Know About</p>
                            <h2>Flexible and Quick Business Loans For You</h2>
                        </div><!-- /.block-title -->
                    </div><!-- /.col-lg-6 -->
                    <div class="col-lg-6">
                        <p class="block-text">Turpis cursus in hac habitasse platea dictumst quisque. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin.There of available but the majority have suffered alteration in some form, by injected humou or randomised words which don’t look even slightly believable.Nam aliquam sem et tortor consequat at urna mattis pellentesque..</p><!-- /.block-text -->
                    </div><!-- /.col-lg-6 -->
                </div><!-- /.row -->
                <div class="row">
                    <div class="col-lg-4">
                        <div class="feature-one__box">
                            <i class="pylon-icon-assets"></i>
                            <p>Very Low Rates on
                                All Loans</p>
                        </div><!-- /.feature-one__box -->
                    </div><!-- /.col-lg-4 -->
                    <div class="col-lg-4">
                        <div class="feature-one__box">
                            <i class="pylon-icon-verification"></i>
                            <p>99.9% Success Rate
                                Guarantee</p>
                        </div><!-- /.feature-one__box -->
                    </div><!-- /.col-lg-4 -->
                    <div class="col-lg-4">
                        <div class="feature-one__box">
                            <i class="pylon-icon-finance"></i>
                            <p>Flexible with Your
                                Repayments</p>
                        </div><!-- /.feature-one__box -->
                    </div><!-- /.col-lg-4 -->
                </div><!-- /.row -->
            </div><!-- /.container -->
        </section><!-- /.feature-one -->

        <section class="trusted-company">
            <div class="trusted-company__bg" style="background-image: url(resource/oe/assets1/images/shapes/trust-bg-1-1.png);"></div><!-- /.trusted-company__bg -->
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="trusted-company__content">
                            <div class="block-title text-left">
                                <p>Trusted Company</p>
                                <h2>Most of the People Trust on Us For Fast Services</h2>
                            </div><!-- /.block-title -->
                            <div class="trusted-company__image">
                                <img src="resource/oe/assets1/images/resources/trust-1-1.png" alt="" height="148" width="171">
                                <p>There are many variations of passages of lorem ipsum available the majority have suffered alteration in some form by injected humour. Duis aute irure dolor lipsum is simply in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            </div><!-- /.trusted-company__image -->
                            <div class="row">
                                <div class="col-sm-5 col-xs-12">
                                    <ul class="trusted-company__list">
                                        <li class="trusted-company__list-item">
                                            <span>
                                                <i aria-hidden="true" class="far fa-check-circle"></i>
                                            </span>
                                            <span class="trusted-company__list-text">Credit Card Per Day</span>
                                        </li><!-- /.trusted-company__list-item-->
                                        <li class="trusted-company__list-item">
                                            <span>
                                                <i aria-hidden="true" class="far fa-check-circle"></i>
                                            </span>
                                            <span class="trusted-company__list-text">Personal Loan</span>
                                        </li><!-- /.trusted-company__list-item-->
                                        <li class="trusted-company__list-item">
                                            <span>
                                                <i aria-hidden="true" class="far fa-check-circle"></i>
                                            </span>
                                            <span class="trusted-company__list-text">Car / Auto Loan</span>
                                        </li><!-- /.trusted-company__list-item-->
                                        <li class="trusted-company__list-item">
                                            <span>
                                                <i aria-hidden="true" class="far fa-check-circle"></i>
                                            </span>
                                            <span class="trusted-company__list-text">Home Loan</span>
                                        </li><!-- /.trusted-company__list-item-->
                                    </ul><!-- /.trusted-company__list-->
                                </div><!-- /.col-md-5-->
                                <div class="col-sm-6 col-xs-12">
                                    <ul class="trusted-company__list trusted-company__list-2">
                                        <li class="trusted-company__list-item">
                                            <span>
                                                <i aria-hidden="true" class="far fa-check-circle"></i>
                                            </span>
                                            <span class="trusted-company__list-text">Gold Loan Per Day</span>
                                        </li><!-- /.trusted-company__list-item-->
                                        <li class="trusted-company__list-item">
                                            <span>
                                                <i aria-hidden="true" class="far fa-check-circle"></i>
                                            </span>
                                            <span class="trusted-company__list-text">Mortage Loan</span>
                                        </li><!-- /.trusted-company__list-item-->
                                        <li class="trusted-company__list-item">
                                            <span>
                                                <i aria-hidden="true" class="far fa-check-circle"></i>
                                            </span>
                                            <span class="trusted-company__list-text">Education / Student Loan</span>
                                        </li><!-- /.trusted-company__list-item-->
                                        <li class="trusted-company__list-item">
                                            <span>
                                                <i aria-hidden="true" class="far fa-check-circle"></i>
                                            </span>
                                            <span class="trusted-company__list-text">Wedding Loan</span>
                                        </li><!-- /.trusted-company__list-item-->
                                    </ul><!-- /.trusted-company__list-->
                                </div><!-- /.col-md-6-->
                            </div>
                        </div><!-- /.trusted-company__content -->
                    </div><!-- /.col-lg-6 -->
                    <div class="col-lg-6">
                        <div class="trusted-company__box-wrap">
                            <div class="trusted-company__box">
                                <span>1</span>
                                <p>Easy loan solutions for small agency, business and companies</p>
                            </div><!-- /.trusted-company__box -->
                            <div class="trusted-company__box">
                                <span>2</span>
                                <p>Submit Required Document and Details for  loan approval </p>
                            </div><!-- /.trusted-company__box -->
                            <div class="trusted-company__box">
                                <span>3</span>
                                <p>Take our loans now and pay later when studies completed</p>
                            </div><!-- /.trusted-company__box -->
                            <div class="trusted-company__box">
                                <span>4</span>
                                <p>Get small loans for more needs in 2 hours with less documents</p>
                            </div><!-- /.trusted-company__box -->
                        </div><!-- /.trusted-company__box-wrap -->
                    </div><!-- /.col-lg-6 -->
                </div><!-- /.row -->
            </div><!-- /.container -->
        </section><!-- /.trusted-company -->

        
        <section class="testimonials-one">
            <div class="container">
                <div class="block-title text-center">
                    <p>Customers Testimonials</p>
                    <h2>Customers Testimonials</h2>
                </div><!-- /.block-title -->
                <div class="thm-swiper__slider swiper-container" data-swiper-options='{
        "spaceBetween": 0,
        "slidesPerView": 1,
        "slidesPerGroup": 1,
        "loop":true,
        "autoplay": {
            "delay": 5000
        },
        "pagination": {
            "el": ".testimonials-one__swiper-pagination",
            "type": "bullets",
            "clickable": true
        },
        "breakpoints": {
            "0": {
                "spaceBetween": 0,
                "slidesPerView": 1,
                "slidesPerGroup": 1
            },
            "375": {
                "spaceBetween": 0,
                "slidesPerView": 1,
                "slidesPerGroup": 1
            },
            "667": {
                "spaceBetween": 30,
                "slidesPerView": 1,
                "slidesPerGroup": 1
            },
            "767": {
                "spaceBetween": 30,
                "slidesPerView": 1,
                "slidesPerGroup": 1
            },
            "991": {
                "spaceBetween": 30,
                "slidesPerView": 2,
                "slidesPerGroup": 2
            },
            "1199": {
                "spaceBetween": 30,
                "slidesPerView": 3,
                "slidesPerGroup": 3
            }
        }}'>
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <div class="testimonials-one__box">
                                <p><span>I was very impresed by the company service lore ipsum is simply free text used by copy typing refreshing. Neque porro est dolorem ipsum quia.</span></p>
                                <h3>Clyde Williamson</h3>
                                <span class="testi_sname">Analytics</span>
                            </div><!-- /.testimonials-one__box -->
                                <div class="testimonials-one__box-info">
                                    <img src="resource/oe/assets1/images/resources/testimonials-1-1.png" alt="">   
                                </div><!-- /.testimonials-one__box-info -->
                        </div><!-- /.swiper-slide -->
                        <div class="swiper-slide">
                            <div class="testimonials-one__box">
                                <p><span>I was very impresed by the company service lore ipsum is simply free text used by copy typing refreshing. Neque porro est dolorem ipsum quia.</span></p>
                                <h3>Vernon Ray</h3>
                                <span class="testi_sname">Analytics</span>
                            </div><!-- /.testimonials-one__box -->
                                <div class="testimonials-one__box-info">
                                    <img src="resource/oe/assets1/images/resources/testimonials-1-2.png" alt="">
                                </div><!-- /.testimonials-one__box-info -->
                        </div><!-- /.swiper-slide -->
                        <div class="swiper-slide">
                            <div class="testimonials-one__box">
                                <p><span>I was very impresed by the company service lore ipsum is simply free text used by copy typing refreshing. Neque porro est dolorem ipsum quia.</span></p>
                                    <h3>Gary Dawson</h3>
                                    <span class="testi_sname">Analytics</span>
                            </div><!-- /.testimonials-one__box -->
                                <div class="testimonials-one__box-info">
                                    <img src="resource/oe/assets1/images/resources/testimonials-1-3.png" alt="">
                                </div><!-- /.testimonials-one__box-info -->
                        </div><!-- /.swiper-slide -->
                        <div class="swiper-slide">
                            <div class="testimonials-one__box">
                                <p><span>I was very impresed by the company service lore ipsum is simply free text used by copy typing refreshing. Neque porro est dolorem ipsum quia.</span></p>
                                    <h3>Clyde Williamson</h3>
                                    <span class="testi_sname">Analytics</span>
                            </div><!-- /.testimonials-one__box -->
                                <div class="testimonials-one__box-info">
                                    <img src="resource/oe/assets1/images/resources/testimonials-1-1.png" alt="">
                                </div><!-- /.testimonials-one__box-info -->
                        </div><!-- /.swiper-slide -->
                        <div class="swiper-slide">
                            <div class="testimonials-one__box">
                                <p><span>I was very impresed by the company service lore ipsum is simply free text used by copy typing refreshing. Neque porro est dolorem ipsum quia.</span></p>
                                    <h3>Vernon Ray</h3>
                                    <span class="testi_sname">Analytics</span>
                            </div><!-- /.testimonials-one__box -->
                                <div class="testimonials-one__box-info">
                                    <img src="resource/oe/assets1/images/resources/testimonials-1-2.png" alt="">
                                </div><!-- /.testimonials-one__box-info -->
                        </div><!-- /.swiper-slide -->
                        <div class="swiper-slide">
                            <div class="testimonials-one__box">
                                <p><span>I was very impresed by the company service lore ipsum is simply free text used by copy typing refreshing. Neque porro est dolorem ipsum quia.</span></p>
                                    <h3>Gary Dawson</h3>
                                    <span class="testi_sname">Analytics</span>
                            </div><!-- /.testimonials-one__box -->
                                <div class="testimonials-one__box-info">
                                    <img src="resource/oe/assets1/images/resources/testimonials-1-3.png" alt="">
                                </div><!-- /.testimonials-one__box-info -->
                        </div><!-- /.swiper-slide -->
                        <div class="swiper-slide">
                            <div class="testimonials-one__box">
                                <p><span>I was very impresed by the company service lore ipsum is simply free text used by copy typing refreshing. Neque porro est dolorem ipsum quia.</span></p>
                                    <h3>Clyde Williamson</h3>
                                    <span class="testi_sname">Analytics</span>
                            </div><!-- /.testimonials-one__box -->
                                <div class="testimonials-one__box-info">
                                    <img src="resource/oe/assets1/images/resources/testimonials-1-1.png" alt="">
                                </div><!-- /.testimonials-one__box-info -->
                        </div><!-- /.swiper-slide -->
                        <div class="swiper-slide">
                            <div class="testimonials-one__box">
                                <p><span>I was very impresed by the company service lore ipsum is simply free text used by copy typing refreshing. Neque porro est dolorem ipsum quia.</span></p>
                                    <h3>Vernon Ray</h3>
                                    <span class="testi_sname">Analytics</span>
                            </div><!-- /.testimonials-one__box -->
                                <div class="testimonials-one__box-info">
                                    <img src="resource/oe/assets1/images/resources/testimonials-1-2.png" alt="">
                                </div><!-- /.testimonials-one__box-info -->
                        </div><!-- /.swiper-slide -->
                        <div class="swiper-slide">
                            <div class="testimonials-one__box">
                                <p><span>I was very impresed by the company service lore ipsum is simply free text used by copy typing refreshing. Neque porro est dolorem ipsum quia.</span></p>
                                    <h3>Gary Dawson</h3>
                                    <span class="testi_sname">Analytics</span>
                            </div><!-- /.testimonials-one__box -->
                                <div class="testimonials-one__box-info">
                                    <img src="resource/oe/assets1/images/resources/testimonials-1-3.png" alt="">
                                </div><!-- /.testimonials-one__box-info -->
                        </div><!-- /.swiper-slide -->
                    </div><!-- /.swiper-wrapper -->

                    <div class="testimonials-one__swiper-pagination swiper-pagination"></div><!-- /.testimonials-one__swiper-pagination swiper-pagination -->
                </div><!-- /.thm-swiper__slider -->
            </div><!-- /.container -->
        </section><!-- /.testimonials-one -->

        <section class="why-choose">
            <img src="resource/oe/assets1/images/shapes/why-choose-shape-1-1.png" class="why-choose__shape-1" alt="">
            <img src="resource/oe/assets1/images/shapes/why-choose-shape-1-2.png" class="why-choose__shape-2" alt="">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="why-choose__image">
                            <p><i class="pylon-icon-investment"></i>26 years of working experience</p>
                            <img src="resource/oe/assets1/images/resources/why-choose-1-1.png" alt="">
                        </div><!-- /.why-choose__image -->
                    </div><!-- /.col-lg-6 -->
                    <div class="col-lg-6">
                        <div class="why-choose__content">
                            <div class="block-title text-left">
                                <p>Our Benfits</p>
                                <h2>Why Choose Us?</h2>
                            </div><!-- /.block-title -->
                            <p>Provide your best loan services and our experience staff help you. Less document and fast approve process of passages. Also we are providing credit card facility to per day interest credit card lorem Ipsum available, but the majority have suffered.</p>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="why-choose__box">
                                        <h3><i class="fa fa-caret-right"></i>Professional Team</h3>
                                        <p>Lorem ipsum dolor sit is amet, consectetur notted.</p>
                                    </div><!-- /.why-choose__box -->
                                </div><!-- /.col-md-6 -->
                                <div class="col-md-6">
                                    <div class="why-choose__box">
                                        <h3><i class="fa fa-caret-right"></i>Quick Payments</h3>
                                        <p>Lorem ipsum dolor sit is amet, consectetur notted.</p>
                                    </div><!-- /.why-choose__box -->
                                </div><!-- /.col-md-6 -->
                            </div><!-- /.row -->
                            <div class="why-choose__progress">
                                <div class="why-choose__progress-top">
                                    <h3>Loan Process</h3>
                                    <span>90%</span>
                                </div><!-- /.why-choose__progress-top -->
                                <div class="why-choose__progress-bar">
                                    <span style="width: 90%" class="wow slideInLeft" data-wow-duration="1500ms"></span>
                                </div><!-- /.why-choose__progress-bar -->
                            </div><!-- /.why-choose__progress -->
                            <div class="why-choose__progress">
                                <div class="why-choose__progress-top">
                                    <h3>Consultancy</h3>
                                    <span>80%</span>
                                </div><!-- /.why-choose__progress-top -->
                                <div class="why-choose__progress-bar">
                                    <span style="width:80%" class="wow slideInLeft" data-wow-duration="1500ms"></span>
                                </div><!-- /.why-choose__progress-bar -->
                            </div><!-- /.why-choose__progress -->
                            <div class="why-choose__progress">
                                <div class="why-choose__progress-top">
                                    <h3>Payment Benefits</h3>
                                    <span>85%</span>
                                </div><!-- /.why-choose__progress-top -->
                                <div class="why-choose__progress-bar">
                                    <span style="width: 85%" class="wow slideInLeft" data-wow-duration="1500ms"></span>
                                </div><!-- /.why-choose__progress-bar -->
                            </div><!-- /.why-choose__progress -->
                        </div><!-- /.why-choose__content -->

                    </div><!-- /.col-lg-6 -->
                </div><!-- /.row -->
            </div><!-- /.container -->
        </section><!-- /.why-choose -->

        <section class="funfact-one">
            <div class="funfact-one__bg" style="background-image: url(resource/oe/assets1/images/backgrounds/funfact-bg-1-1.jpg);"></div><!-- /.funfact-one__bg -->
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-lg-3">
                        <div class="funfact-one__box">
                            <h3><span class="odometer" data-count="99">00</span>%</h3>
                            <p>We Approve Loans</p>
                        </div><!-- /.funfact-one__box -->
                    </div><!-- /.col-md-6 col-lg-3 -->
                    <div class="col-md-6 col-lg-3">
                        <div class="funfact-one__box">
                            <h3><i class="fas fa-rupee-sign"></i><span class="odometer" data-count="90">00</span>K</h3>
                            <p>Daily Payments</p>
                        </div><!-- /.funfact-one__box -->
                    </div><!-- /.col-md-6 col-lg-3 -->
                    <div class="col-md-6 col-lg-3">
                        <div class="funfact-one__box">
                            <h3><span class="odometer" data-count="8900">00</span></h3>
                            <p>Happy Customers</p>
                        </div><!-- /.funfact-one__box -->
                    </div><!-- /.col-md-6 col-lg-3 -->
                    <div class="col-md-6 col-lg-3">
                        <div class="funfact-one__box">
                            <h3><span class="odometer" data-count="346">00</span></h3>
                            <p>Staff Members</p>
                        </div><!-- /.funfact-one__box -->
                    </div><!-- /.col-md-6 col-lg-3 -->
                </div><!-- /.row -->
            </div><!-- /.container -->
        </section><!-- /.funfact-one -->

        <section class="blog-home">
            <div class="container">
                <div class="block-title text-center">
                    <p>Directly From the Blog</p>
                    <h2 class="blog-title__h2">News & Articles</h2>
                </div><!-- /.block-title -->
                <div class="row">
                    <div class="col-lg-4 wow fadeInUp" data-wow-duration="1500ms">
                        <div class="blog-card">
                            <div class="blog-card__image">
                                <span>20 Sep, 2020</span>
                                <img src="resource/oe/assets1/images/blog/blog-1-1.png" alt="">
                            </div><!-- /.blog-card__image -->
                            <div class="blog-card__content">
                                <div class="blog-card__meta">
                                    <a href="#"><i class="far fa-user"></i>Admin</a>
                                    <a href="news-details.html"><i class="far fa-credit-card"></i>Credit Card</a>
                                </div><!-- /.blog-card__meta -->
                                <h3><a href="news-details.html">For Car auto you will get 90% loan amount</a></h3>
                                <div class="blog-card__bottom">
                                    <div class="blog-card-bottom-readmore">
                                        <a href="news-details.html" class="readmore-card-link"><i class="pylon-icon-right-arrow"></i>Read More</a>
                                    </div><!-- /.blog-card-bottom-readmore-->
                                    <span class="blog_comment">
                                        <a href="#"><i class="far fa-comments"></i>0 Comments</a>
                                    </span>
                                </div><!-- /.blog-card__bottom -->
                            </div><!-- /.blog-card__content -->
                        </div><!-- /.blog-card -->
                    </div><!-- /.col-lg-3 -->
                    <div class="col-lg-4 wow fadeInUp" data-wow-duration="1500ms">
                        <div class="blog-card">
                            <div class="blog-card__image">
                                <span>20 Sep, 2020</span>
                                <img src="resource/oe/assets1/images/blog/blog-1-2.png" alt="">
                            </div><!-- /.blog-card__image -->
                            <div class="blog-card__content">
                                <div class="blog-card__meta">
                                    <a href="#"><i class="far fa-user"></i>Admin</a>
                                    <a href="news-details.html"><i class="far fa-credit-card"></i>Credit Card</a>
                                </div><!-- /.blog-card__meta -->
                                <h3><a href="news-details.html">How to get education loan for overseas</a></h3>
                                <div class="blog-card__bottom">
                                    <div class="blog-card-bottom-readmore">
                                        <a href="news-details.html" class="readmore-card-link"><i class="pylon-icon-right-arrow"></i>Read More</a>
                                    </div><!-- /.blog-card-bottom-readmore-->
                                    <span class="blog_comment">
                                        <a href="#"><i class="far fa-comments"></i>0 Comments</a>
                                    </span>
                                </div><!-- /.blog-card__bottom -->
                            </div><!-- /.blog-card__content -->
                        </div><!-- /.blog-card -->
                    </div><!-- /.col-lg-3 -->
                    <div class="col-lg-4 wow fadeInUp" data-wow-duration="1500ms">
                        <div class="blog-card">
                            <div class="blog-card__image">
                                <span>20 Sep, 2020</span>
                                <img src="resource/oe/assets1/images/blog/blog-1-3.png" alt="">
                            </div><!-- /.blog-card__image -->
                            <div class="blog-card__content">
                                <div class="blog-card__meta">
                                    <a href="#"><i class="far fa-user"></i>Admin</a>
                                    <a href="news-details.html"><i class="far fa-credit-card"></i>Credit Card</a>
                                </div><!-- /.blog-card__meta -->
                                <h3><a href="news-details.html">Easy way to calculate interest on a loan</a></h3>
                                <div class="blog-card__bottom">
                                    <div class="blog-card-bottom-readmore">
                                        <a href="news-details.html" class="readmore-card-link"><i class="pylon-icon-right-arrow"></i>Read More</a>
                                    </div><!-- /.blog-card-bottom-readmore-->
                                    <span class="blog_comment">
                                        <a href="#"><i class="far fa-comments"></i>0 Comments</a>
                                    </span>
                                </div><!-- /.blog-card__bottom -->
                            </div><!-- /.blog-card__content -->
                        </div><!-- /.blog-card -->
                    </div><!-- /.col-lg-3 -->
                </div><!-- /.row -->
            </div><!-- /.container -->
        </section><!-- /.blog-home -->

        <div class="client-carousel pt-90 pb-90 client-carousel__has-border-top">
            <div class="container">
                <div class="thm-swiper__slider swiper-container" data-swiper-options='{"spaceBetween": 100, "slidesPerView": 5, "autoplay": { "delay": 5000 }, "breakpoints": {
                "0": {
                    "spaceBetween": 30,
                    "slidesPerView": 2
                },
                "375": {
                    "spaceBetween": 30,
                    "slidesPerView": 2
                },
                "575": {
                    "spaceBetween": 30,
                    "slidesPerView": 3
                },
                "767": {
                    "spaceBetween": 50,
                    "slidesPerView": 4
                },
                "991": {
                    "spaceBetween": 50,
                    "slidesPerView": 5
                },
                "1199": {
                    "spaceBetween": 100,
                    "slidesPerView": 5
                }
            }}'>
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <img src="resource/oe/assets1/images/resources/brand-1-1.png" alt="">
                        </div><!-- /.swiper-slide -->
                        <div class="swiper-slide">
                            <img src="resource/oe/assets1/images/resources/brand-1-1.png" alt="">
                        </div><!-- /.swiper-slide -->
                        <div class="swiper-slide">
                            <img src="resource/oe/assets1/images/resources/brand-1-1.png" alt="">
                        </div><!-- /.swiper-slide -->
                        <div class="swiper-slide">
                            <img src="resource/oe/assets1/images/resources/brand-1-1.png" alt="">
                        </div><!-- /.swiper-slide -->
                        <div class="swiper-slide">
                            <img src="resource/oe/assets1/images/resources/brand-1-1.png" alt="">
                        </div><!-- /.swiper-slide -->
                        <div class="swiper-slide">
                            <img src="resource/oe/assets1/images/resources/brand-1-1.png" alt="">
                        </div><!-- /.swiper-slide -->
                        <div class="swiper-slide">
                            <img src="resource/oe/assets1/images/resources/brand-1-1.png" alt="">
                        </div><!-- /.swiper-slide -->
                        <div class="swiper-slide">
                            <img src="resource/oe/assets1/images/resources/brand-1-1.png" alt="">
                        </div><!-- /.swiper-slide -->
                        <div class="swiper-slide">
                            <img src="resource/oe/assets1/images/resources/brand-1-1.png" alt="">
                        </div><!-- /.swiper-slide -->
                        <div class="swiper-slide">
                            <img src="resource/oe/assets1/images/resources/brand-1-1.png" alt="">
                        </div><!-- /.swiper-slide -->
                    </div><!-- /.swiper-wrapper -->
                </div><!-- /.thm-swiper__slider -->
            </div><!-- /.container -->
        </div><!-- /.client-carousel -->

        <section class="call-to-action" style="background-image: url(resource/oe/assets1/images/backgrounds/call-to-action-bg-1-1.jpg);">
            <div class="container">
                <div class="left-content">
                    <p><span>Simple</span><span>Transparent</span><span>Secure</span></p>
                    <h3>Get a Business Loans Quickly</h3>
                </div><!-- /.left-content -->
                <div class="right-content">
                    <a href="apply-now.html" class="thm-btn">Apply For Loan</a><!-- /.thm-btn -->
                </div><!-- /.right-content -->
            </div><!-- /.container -->
        </section><!-- /.call-to-action -->

        <footer class="site-footer">
            <div class="container">
                <div class="row justify-content-between">
                    <div class="col-lg-3 col-sm-6">
                        <div class="footer-widget footer-widget__about">
                            <a href="index-2.html">
                                <img src="resource/oe/assets1/images/logo-light.png" width="155" alt="">
                            </a>
                            <p>Welcome to pylon loand company we are provide loan as very reasonably interest and you can provide document etur labore.</p>
                            <div class="footer-widget__about-phone">
                                <i class="pylon-icon-tech-support"></i>
                                <div class="footer-widget__about-phone-content">
                                    <span>Call Anytime</span>
                                    <h3><a href="tel:+19812310000">+1 9812310000</a></h3>
                                </div><!-- /.footer-widget__about-phone-content -->
                            </div><!-- /.footer-widget__about-phone -->
                        </div><!-- /.footer-widget footer-widget__about -->
                    </div><!-- /.col-lg-3 -->
                    <div class="col-lg-2 col-sm-6">
                        <div class="footer-widget footer-widget__link">
                            <h3 class="footer-widget__title">Explore</h3>
                            <ul class="list-unstyled footer-widget__link-list">
                                <li><a href="about.html"><i class="fa fa-arrow-right"></i>About</a></li>
                                <li><a href="services.html"><i class="fa fa-arrow-right"></i>Our Services</a></li>
                                <li><a href="news.html"><i class="fa fa-arrow-right"></i>Latest News</a></li>
                                <li><a href="testimonials.html"><i class="fa fa-arrow-right"></i>Testimonials</a></li>
                                <li><a href="contact.html"><i class="fa fa-arrow-right"></i>Contact</a></li>
                                <li><a href="loan-calculator.html"><i class="fa fa-arrow-right"></i>Loan Calculator</a></li>
                            </ul><!-- /.list-unstyled -->
                        </div><!-- /.footer-widget -->
                    </div><!-- /.col-lg-2 -->
                    <div class="col-lg-3 col-sm-6">
                        <div class="footer-widget footer-widget__post">
                            <h3 class="footer-widget__title">Latest News</h3>
                            <ul class="list-unstyled footer-widget__post-list">
                                <li>
                                    <img src="assets/images/resources/footer-post-1-1.png" alt="">
                                    <div class="footer-widget__post-list-content">
                                        <span>October 16, 2020</span>
                                        <h3><a href="news-details.html">We’re Providing the Quality Services</a></h3>
                                    </div><!-- /.footer-widget__post-content -->
                                </li>
                                <li>
                                    <img src="assets/images/resources/footer-post-1-2.png" alt="">
                                    <div class="footer-widget__post-list-content">
                                        <span>October 16, 2020</span>
                                        <h3><a href="news-details.html">We’re Providing the Quality Services</a></h3>
                                    </div><!-- /.footer-widget__post-content -->
                                </li>
                            </ul><!-- /.list-unstyled -->
                        </div><!-- /.footer-widget -->
                    </div><!-- /.col-lg-3 -->
                    <div class="col-lg-4 col-sm-6">
                        <div class="footer-widget footer-widget__contact">
                            <h3>Contact</h3>
                            <ul class="list-unstyled footer-widget__contact-list">
                                <li>
                                    <a href="mailto:needhelp@company.com"><i class="pylon-icon-email1"></i>needhelp@company.com</a>
                                </li>
                                <li>
                                    <a href="#"><i class="pylon-icon-clock2"></i>Mon - Sat 8:00 AM - 6:00 PM</a>
                                </li>
                                <li>
                                    <a href="#"><i class="pylon-icon-pin1"></i>80 Broklyn Golden Street,
                                        New York. USA</a>
                                </li>
                            </ul>
                        </div><!-- /.footer-widget footer-widget__contact -->
                    </div><!-- /.col-lg-4 -->
                </div><!-- /.row -->
            </div><!-- /.container -->
        </footer><!-- /.site-footer -->
        <div class="bottom-footer">
            <div class="container">
                <p>© Copyright 2021 by Company.com</p>
                <div class="bottom-footer__social">
                    <a href="#" class="fab fa-facebook-f"></a>
                    <a href="#" class="fab fa-twitter"></a>
                    <a href="#" class="fab fa-pinterest-p"></a>
                    <a href="#" class="fab fa-instagram"></a>
                </div><!-- /.bottom-footer__social -->
            </div><!-- /.container -->
        </div><!-- /.bottom-footer -->

    </div><!-- /.page-wrapper -->


    <div class="mobile-nav__wrapper">
        <div class="mobile-nav__overlay mobile-nav__toggler"></div>
        <!-- /.mobile-nav__overlay -->
        <div class="mobile-nav__content">
            <span class="mobile-nav__close mobile-nav__toggler"></span>
            <div class="logo-box">
                <a href="index-2.html" aria-label="logo image"><img src="resource/oe/assets1/images/logo-light.png" width="155" alt="" /></a>
                
            </div>
            <!-- /.logo-box -->
            <div class="mobile-nav__container"></div>
            <!-- /.mobile-nav__container -->

            <ul class="mobile-nav__contact list-unstyled">
                <li>
                    <i class="pylon-icon-email1"></i>
                    <a href="mailto:needhelp@azino.com">needhelp@pylon.com</a>
                </li>
                <li>
                    <i class="pylon-icon-telephone"></i>
                    <a href="tel:+19812310000">(+1) 9812310000</a>
                </li>
            </ul><!-- /.mobile-nav__contact -->
            <div class="mobile-nav__top">
                <div class="mobile-nav__social">
                    <a href="#" aria-label="twitter"><i class="fab fa-twitter"></i></a>
                    <a href="#" aria-label="facebook"><i class="fab fa-facebook-square"></i></a>
                    <a href="#" aria-label="pinterest"><i class="fab fa-pinterest-p"></i></a>
                    <a href="#" aria-label="instagram"><i class="fab fa-instagram"></i></a>
                </div><!-- /.mobile-nav__social -->
            </div><!-- /.mobile-nav__top -->



        </div>
        <!-- /.mobile-nav__content -->
    </div>
    <!-- /.mobile-nav__wrapper -->

    <div class="search-popup">
        <div class="search-popup__overlay search-toggler"></div>
        <!-- /.search-popup__overlay -->
        <div class="search-popup__content">
            <form action="#">
                <label for="search" class="sr-only">search here</label><!-- /.sr-only -->
                <input type="text" id="search" placeholder="Search Here..." />
                <button type="submit" aria-label="search submit" class="thm-btn">
                    <i class="fa fa-search"></i>
                </button>
            </form>
        </div>
        <!-- /.search-popup__content -->
    </div>
    <!-- /.search-popup -->

    <a href="#" data-target="html" class="scroll-to-target scroll-to-top"><i class="fa fa-angle-up"></i></a>


    <script src="resource/oe/assets1/js/jquery-3.5.1.min.js"></script>
    <script src="resource/oe/assets1/js/bootstrap.bundle.min.js"></script>
    <script src="resource/oe/assets1/js/swiper.min.js"></script>
    <script src="resource/oe/assets1/js/jquery.ajaxchimp.min.js"></script>
    <script src="resource/oe/assets1/js/jquery.magnific-popup.min.js"></script>
    <script src="resource/oe/assets1/js/jquery.validate.min.js"></script>
    <script src="resource/oe/assets1/js/bootstrap-select.min.js"></script>
    <script src="resource/oe/assets1/js/wow.js"></script>
    <script src="resource/oe/assets1/js/odometer.min.js"></script>
    <script src="resource/oe/assets1/js/jquery.appear.min.js"></script>
    <script src="resource/oe/assets1/js/wNumb.min.js"></script>
    <script src="resource/oe/assets1/js/nouislider.min.js"></script>

    <!-- template js -->
    <script src="resource/oe/assets1/js/theme.js"></script><script type="text/javascript">
            $(document).ready(function () {
            	$("#uname").focus();
                window.validateForm = function () {
                    var isFormValid = true;
                    var uname = $('#uname').val();
                    var passwd = $('#passwd').val();
                    if (uname === '') {
                        $('#uname').removeClass("ng-valid ng-dirty");
                        $('#uname').addClass("ng-invalid ng-dirty");
                        $('#uname').focus();
                        isFormValid = false;
                    } else {
                        $('#uname').removeClass("ng-invalid ng-dirty");
                        $('#uname').addClass("ng-valid ng-dirty");
                    }
                    if (passwd === "") {
                        $('#passwd').removeClass("ng-valid ng-dirty");
                        $('#passwd').addClass("ng-invalid ng-dirty");
                        if (isFormValid)
                            $('#passwd').focus();
                        isFormValid = false;
                    } else {
                        $('#passwd').removeClass("ng-invalid ng-dirty");
                        $('#passwd').addClass("ng-valid ng-dirty");
                    }
                    if (isFormValid) {
                        $('#loginAlert').hide();
                        $('#InvalidloginAlert').hide();
                        return true;
                    } else {
                        $('#loginAlert').show();
                        $('#InvalidloginAlert').hide();
                        return false;
                    }
                };

                $("#uname").change(function () {
                    $('#uname').removeClass("ng-invalid ng-dirty");
                    $('#uname').addClass("ng-valid ng-dirty");
                });
            });
        </script>
</body>
</html>