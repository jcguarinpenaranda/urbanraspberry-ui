<?php

require 'vendor/autoload.php';

$app = new \Slim\Slim(array(
		'mode'=>'development'
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
	$params = $app->request()->params();

	if(!isset($params['password'])){

		echo json_encode(array("status"=>400, "description"=>"Bad Request. Missing parameter password."));

		return;
	}

	$user = [];
	$user['password'] = $params['password'];

	$passwordsfile = file_get_contents("passwords.json");
	$passwords = json_decode($passwordsfile,true);


	if(md5($user['password']) == $passwords['user'] || md5($user['password']) == $passwords['production']){
		
		session_start();		

		$_SESSION['user'] = $user;

		echo json_encode(array("status"=>200, "description"=>"Logged in"));

	}else{

		echo json_encode(array("status"=>400, "description"=>"Bad password."));

	}

});

$app->get('/login/', function() use ($app){
	session_start();

	if(isset($_SESSION['user']) && !empty($_SESSION['user'])){

		echo json_encode(array("status"=>200, "description"=>"Logged in."));

	}else{

		echo json_encode(array("status"=>404, "description"=>"Not logged in."));

	}

});


$app->post('/logout/', function () use ($app) {

	session_start();
	session_destroy();

});

$app->get('/logout/', function () use ($app) {

	session_start();
	session_destroy();

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