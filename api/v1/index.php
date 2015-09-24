<?php

require 'vendor/autoload.php';

$app = new \Slim\Slim(array(
		'mode'=>'production'
	));

// Only invoked if mode is "production"
$app->configureMode('production', function () use ($app) {
    $app->config(array(
        'log.enable' => true,
        'debug' => false
    ));
});

// Only invoked if mode is "development"
$app->configureMode('development', function () use ($app) {
    $app->config(array(
        'log.enable' => false,
        'debug' => true
    ));
});

//The login behaviour
$app->post('/login/', function () use ($app) {
	$params = $app->request->params();

	$user = [];
	$user[] = $params['email'];
	$user[] = $params['password'];

});

/*
The register behaviour of the
*/
$app->post('/register/', function () use ($app) {
	$params = $app->request->params();

	if(!isset($params['username']) || !isset($params['email']) || isset($params['password'])){

	}

	$user = [];
	$user[] = $params['username'];
	$user[] = $params['email'];
	$user[] = $params['password'];

	//Add the user to the database

	if(true){
		echo json_encode(array("status"=>200));
	}

});

$app->post('/recover-password/', function() use ($app){
	$params = $app->request->params();

	$user = [];
	$user[] = $params['email'];

	//send email

});


$app->get('/fullpath/',function(){
	$app = \Slim\Slim::getInstance();
	$req = $app->request;
	echo $req->getUrl().$req->getPath();
});

$app->run();