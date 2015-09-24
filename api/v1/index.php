<?php

require 'vendor/autoload.php';

$app = new \Slim\Slim();

$app->post('/login/', function () use ($app) {
	$params = $app->request->params();

	$user = [];
	$user[] = $params['email'];
	$user[] = $params['password'];

});

$app->post('/register/', function () use ($app) {
	$params = $app->request->params();

	$user = [];
	$user[] = $params['username'];
	$user[] = $params['email'];
	$user[] = $params['password'];

	//Adding the user to de database

});

$app->post('/recover-password/', function(){
	$params = $app->request->params();

	$user = [];
	$user[] = $params['email'];

});

$app->run();