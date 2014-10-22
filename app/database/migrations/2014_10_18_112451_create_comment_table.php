<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	
	public function up()
	{
		Schema::create('comments', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('article_id')->unsigned();
			$table->integer('user_id')->unsigned();
			$table->text('comment');
			$table->integer('challenge')->unsigned()->nullable();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('comments');
	}

}
