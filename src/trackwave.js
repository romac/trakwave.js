
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
    
    var TW = window.TrackWave = function( canvas, data )
    {
        this.canvas  = canvas;
        this.context = canvas.getContext( '2d' );
        this.current = 0;
        this.data    = data;
    }
    
    /*
     * See:
     * - http://www.html5rocks.com/en/tutorials/canvas/performance/
     * - http://jsperf.com/math-round-vs-hack/3
     * - http://jsperf.com/math-round-vs-bitwise-round-func
     */
    TW.round = function( number )
    {
        return ( 0.5 + number ) << 0;
    };
    
    TW.prototype.draw = function()
    {
        this.context.fillStyle = '#323031';
        this.context.fillRect( 0, 0, this.canvas.width, this.canvas.height );
        
        this.drawWave();
        this.drawCursor();
        
        this.current++;
        
        window.requestAnimFrame( this.draw.bind( this ), this.canvas );
    }
    
    TW.prototype.drawCursor = function()
    {
        this.context.fillStyle = '#F73F00';
        this.context.fillRect( this.canvas.width / 2, 0, 2, this.canvas.height );
    }
    
    TW.prototype.drawWave = function()
    {
        var elHeight  = this.canvas.height,
            elWidth   = this.canvas.width,
            cursorPos = TW.round( elWidth / 2 ),
            index     = this.current % ( this.data.length - cursorPos ),
            start, end, i;
        
        this.context.fillStyle = '#E2C400';
        
        if( index < cursorPos )
        {
            end = cursorPos - index;
            
            for( i = 0; i < end; i++ )
            {
                this.context.fillRect( i, TW.round( elHeight / 2 ), 1, 1 );
            }
        }
        
        start  = index > cursorPos ? index - cursorPos : 0;
        end    = index + cursorPos;
        
        for( i = start; i < end; i++ )
        {
            var lineHeight = TW.round( elHeight * this.data[ i ] );
            
            this.context.fillRect(
                ( cursorPos - index ) + i,
                TW.round( ( elHeight - lineHeight ) / 2 ),
                1,
                lineHeight
            );
        }
    }
    
} )();
