<template>
<div class='not-auction'>
    <div class="not-auction-img-box">
    	<img src="../../assets/img/default_page.png" alt="" class='not-auction-img'>
    </div>
    <div class="not-auction-text-box">
    	暂无可推送的拍品
    </div>
    <div class="not-auction-button-box">
    	<router-link to='/picture' class='not-auction-button'>   去发布   </router-link>
    </div>
</div>
</template>
    <style type="text/css" media="screen">
        .not-auction{
        	margin-top: 4.5rem;
        } 
        .not-auction-img-box{
        	padding: 6rem 0 4.2rem;
        }
        .not-auction-img{
        	display: block;
        	margin: auto;
        } 
        .not-auction-text-box{
        	color: #999;
        	font-size: 1.4rem;
        	text-align: center;
        } 
        .not-auction-button-box{
        	margin-top: 2rem;
        	width: 100%;
        	height: 3.9rem;
        }
        .not-auction-button{
        	display: block;
        	margin: auto;
        	width: 17rem;
        	height: 3.9rem;
        	text-align: center;
        	font-size: 1.7rem;
        	line-height: 3.9rem;
        	color: #666;
        	border: 1px solid #999;
        	border-radius: 0.5rem;
        }
    </style>