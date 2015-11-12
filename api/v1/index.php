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


$app->post('/recover-password/', function() use ($app){
	$params = $app->request->params();

	$user = [];
	$user[] = $params['email'];

	//send email


});

//Permitir cambiar el password
$app->post('/change-password/',function() use ($app){

	$data = $app->request->params();

	if($data !== null){

		$passwords = file_get_contents('passwords.json');
		$passwords = json_decode($passwords,true);

		if(md5($data['old']) == $passwords['user']){
			$passwords['user'] = md5($data['new']);
			file_put_contents('passwords.json',json_encode($passwords));
			echo json_encode(array("status"=>200, "description"=> "Password changed"));
		}else{
			echo json_encode(array("status"=>404, "description"=> "Wrong password"));
		}

	}else{
		echo json_encode(array("status"=>400, "description"=> "Bad request. Missing parameters old & new"));
	}

});


$app->get('/fullpath/',function(){
	$app = \Slim\Slim::getInstance();
	$req = $app->request;
	echo $req->getUrl().$req->getPath();
});

$app->run();
