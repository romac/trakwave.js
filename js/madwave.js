
// shim layer with setTimeout fallback
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = ( function()
{
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function( /* function */ callback, /* DOMElement */ element )
            {
                window.setTimeout( callback, 1000 / 60 );
            };
} )();

/*
 * @author  Romain Ruetschi <romain.ruetschi@gmail.com>
 * @license MIT License (http://www.opensource.org/licenses/mit-license.php)
 */

( function()
{
    
    var element   = document.getElementById( 'madwave' ),
        context   = element.getContext( '2d' ),
        current   = 0;
    
    var data = ( function()
    {
        var data = [];
        
        for( var i = 0; i < 10000; i++ )
        {
            data[ i ] = Math.random( 0, 0.9 );
        }
        
        return data;
        
    } )();
    
    function round( number )
    {
        return Math.round( number );
        return ( 0.5 + number ) << 0;
    }
    
    function draw()
    {
        context.clearRect( 0, 0, element.height, element.width );
        context.fillStyle = '#323031';
        context.fillRect( 0, 0, element.width, element.height );
        
        drawWave();
        drawCursor();
        
        current++;
        
        window.requestAnimFrame( draw, element );
    }
    
    function drawCursor()
    {
        context.fillStyle = '#F73F00';
        context.fillRect( element.width / 2, 0, 2, element.height );
    }
    
    function drawWave()
    {
        var offset = round( element.width / 2 ),
            index  = current % ( data.length - offset ),
            start, end, i;
        
        context.fillStyle = '#E2C400';
        
        if( index < offset )
        {
            end = offset - index;
            
            for( i = 0; i < ( offset - index ); i++ )
            {
                context.fillRect( i, round( ( element.height - 1 ) / 2 ), 1, 1 );
            }
        }
        
        start  = index > offset ? index - offset : 0;
        end    = index + offset;
        
        for( i = start; i < end; i += 1 )
        {
            var height = round( element.height * data[ i ] );
            
            context.fillRect( ( offset - index ) + i, round( ( element.height - height ) / 2 ), 1, height );
        }
    }
    
    document.addEventListener(
        'DOMContentLoaded',
        function()
        {
            draw();
        },
        false
    );
    
} )();
