$(document).ready(function(){$(".carousel").carousel({interval:5e3}),$(".nav > li.dropdown > a").click(function(e){var $target=$(e.target);$(this).siblings();if($target.is("b"))return $(this).siblings().toggle("fast"),$(".nav > li.dropdown > ul.dropdown-menu:visible").not($(this).siblings()).hide("fast"),!1})});