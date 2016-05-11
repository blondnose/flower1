/**
 * Created by Administrator on 2015/11/1.
 */


$(function(){

    function show(){
        var colors=["#BA4A3A","#5BB5D6","#8EA83B","#EE5C92","#8AC9B5","#604127","#E8A03B","#AF032D","#000000","#506575"];
        var tags=["女人","男人","电影","宝儿","安妮海瑟薇","数码"];
        for(var i in colors){
            var index = Math.round(Math.random() * 10);
            var img="image/"+index+".jpg";
            var h= img.height;
            var index2=Math.round(Math.random() * (tags.length-1));  //随机获取一个标签

            $('#tiles').append(" <li style='background:darkgray;display: inline-table;padding: 10px;' class='clearFix'>" + "<div style='background:#FFF;display: inline-block;'><img src='"+img+"' width='230' height='h'/></div></li> ");
        }

    }

    //初始化二十条数据
    show();
    show();


    /*瀑布流*/
    $('#tiles').imagesLoaded(function() {
        var handler = null;
        // Prepare layout options.
        var options = {
            autoResize: true, // This will auto-update the layout when the browser window is resized.
            container: $('#down'), // Optional, used for some extra CSS styling
            offset: 75, // Optional, the distance between grid items
            itemWidth: 230, // Optional, the width of a grid item
            direction :'right'

        };

        //瀑布流布局
        function applyLayout() {
            $('#tiles').imagesLoaded(function() {
                // Destroy the old handler        //是否需要销毁旧的布局
                if (handler.wookmarkInstance) {
                    handler.wookmarkInstance.clear();
                }

                // Create a new layout handler. //重新布局瀑布流
                handler = $('#tiles li');
                handler.wookmark(options);    //传入配置参数
            });
        }

        //当滚动条高度大于等于最后一个盒子高度 Ajax请求数据
        //绑定到scroll事件上

        function onScroll(event) {
            // Check if we're within 100 pixels of the bottom edge of the broser window.
            var winHeight = window.innerHeight ? window.innerHeight : $(window).height(); // iphone fix
            var closeToBottom = ($(window).scrollTop() + winHeight > $(document).height() - 100);

            if (closeToBottom) {
                show();
                applyLayout();  //执行布局
            }
        };

        // Capture scroll event.
        $(window).bind('scroll', onScroll);

        // Call the layout function.
        handler = $('#tiles li');  //获取盒子
        handler.wookmark(options);    //初始化瀑布流
    });




});