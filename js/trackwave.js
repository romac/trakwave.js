
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
    
    var element   = document.getElementById( 'trackwave' ),
        context   = element.getContext( '2d' ),
        elHeight  = element.height,
        elWidth   = element.width,
        cursorPos = round( elWidth / 2 ),
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
    
    /*
     * See:
     * - http://www.html5rocks.com/en/tutorials/canvas/performance/
     * - http://jsperf.com/math-round-vs-hack/3
     * - http://jsperf.com/math-round-vs-bitwise-round-func
     */
    function round( number )
    {
        return ( 0.5 + number ) << 0;
    }
    
    function draw()
    {
        context.fillStyle = '#323031';
        context.fillRect( 0, 0, elWidth, elHeight );
        
        drawWave();
        drawCursor();
        
        current++;
        
        window.requestAnimFrame( draw, element );
    }
    
    function drawCursor()
    {
        context.fillStyle = '#F73F00';
        context.fillRect( elWidth / 2, 0, 2, elHeight );
    }
    
    function drawWave()
    {
        var index  = current % ( data.length - cursorPos ),
            start, end, i;
        
        context.fillStyle = '#E2C400';
        
        if( index < cursorPos )
        {
            end = cursorPos - index;
            
            for( i = 0; i < end; i++ )
            {
                context.fillRect( i, round( elHeight / 2 ), 1, 1 );
            }
        }
        
        start  = index > cursorPos ? index - cursorPos : 0;
        end    = index + cursorPos;
        
        for( i = start; i < end; i++ )
        {
            var lineHeight = round( elHeight * data[ i ] );
            
            context.fillRect( ( cursorPos - index ) + i, round( ( elHeight - lineHeight ) / 2 ), 1, lineHeight );
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
