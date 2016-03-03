var index=1;


var url8='https://i.ytimg.com/vi/GgH-uXC-Qmk/maxresdefault.jpg';

var images = new Array()
			function preload() {
				for (i = 0; i < preload.arguments.length; i++) {
					images[i] = new Image()
					images[i].src = preload.arguments[i]
				}
			}
			preload(
				//"http://si.wsj.net/public/resources/images/BN-IW404_Bazaru_J_20150611100807.jpg",
				"http://beachphotosonline.net/images/beaches/beach-wallpaper-11.png",
				'http://wallpapercave.com/wp/VrmXlXD.jpg',

				//"http://3.bp.blogspot.com/-28Tz2V0ZqL8/UQVhscN4eFI/AAAAAAAAC0o/b3Aa_-ApKNM/s1600/mooi-landschap-met-meer-en-bomen.jpeg",
				//'http://wallpaperry.com/sites/default/files/styles/2880x1800/public/images/orig//735%20-%20uV8KBzR.jpg?itok=7ABKuD9L',
				'http://escolha-vencer.com/wp-content/uploads/2015/04/relaxing_sea_swing-1572989.jpg',
				'http://indulgence-hair-salon.com/wp-content/themes/newace6/images/mine/Background-Image4.jpg',
				'http://1.bp.blogspot.com/-kM1HWvB8i9g/T_MJYJenGGI/AAAAAAAAEFY/4NHIy67ccZ4/s1600/Waterfall-4-XOVYYPSKDW-1280x1024.jpg',
				//'http://www.starwallpapers.com/walls/beautiful_beach_view_full_hd_nature_background_wallpaper_for_laptop_widescreen-wide.jpg'
				//'http://www.desktopaper.com/wp-content/uploads/l/exclusive-hd-wallpaper-of-nature-background.jpg',
				//'http://www.designsnext.com/wp-content/uploads/2014/04/Nature-HD-Background-6.jpg'
				//,'http://il1.picdn.net/shutterstock/videos/6229751/thumb/1.jpg'
				
				'http://cdn.paper4pc.com/images/beach-palm-white-sand-wallpaper-2.jpg',
				'https://w-dog.net/wallpapers/13/14/475519839214799/spa-spa-stones-flower-bamboo-water.jpg'			)

  


$(".quote").click(function(){
	$.ajax({
		url:'api/quote',
		success: function(quote){
			$('.quote').html(quote.text);
			$('.author').html(quote.author);
			
			switch(index)
			{
				case 1:document.body.style.backgroundImage="url('http://beachphotosonline.net/images/beaches/beach-wallpaper-11.png')";
				break;
				
				case 2:document.body.style.backgroundImage="url('http://wallpapercave.com/wp/VrmXlXD.jpg')";
				break;
				
				case 3:document.body.style.backgroundImage="url('http://escolha-vencer.com/wp-content/uploads/2015/04/relaxing_sea_swing-1572989.jpg')";
				break;
				case 4:document.body.style.backgroundImage="url('http://indulgence-hair-salon.com/wp-content/themes/newace6/images/mine/Background-Image4.jpg')";
				break;
				//case 7:document.body.style.backgroundImage="url('https://i.ytimg.com/vi/GgH-uXC-Qmk/maxresdefault.jpg')";
				//break;
				case 5:document.body.style.backgroundImage="url('http://1.bp.blogspot.com/-kM1HWvB8i9g/T_MJYJenGGI/AAAAAAAAEFY/4NHIy67ccZ4/s1600/Waterfall-4-XOVYYPSKDW-1280x1024.jpg')";
				break;
				//case 9:document.body.style.backgroundImage="url('http://www.starwallpapers.com/walls/beautiful_beach_view_full_hd_nature_background_wallpaper_for_laptop_widescreen-wide.jpg')";
				//break;
				case 6:document.body.style.backgroundImage="url('http://cdn.paper4pc.com/images/beach-palm-white-sand-wallpaper-2.jpg')";
				break;
				case 7:document.body.style.backgroundImage="url('https://w-dog.net/wallpapers/13/14/475519839214799/spa-spa-stones-flower-bamboo-water.jpg')";
				break;
				
				//case 9:document.body.style.backgroundImage="url('http://il1.picdn.net/shutterstock/videos/6229751/thumb/1.jpg')";
				//break;
				
				

			}	
			index++;
			if(index==8)
				index=1;
			//document.body.style.backgroundImage="url(url1])";
			//$('.background').url("http://www.joomlaworks.net/images/demos/galleries/abstract/7.jpg");//buttonbg[random]);
		}


});
});
