var STATE;

$(document).ready(function() {
    // game settings
    const settings = {
        board: {
          width: 600,
          height: 400,
        },
        paddle: {
          width: 10,
          height: 75,
          speed: 15,
        },
        ball: {
          radius: 5,
          speed: 5,
          x: 300,
          y: 200,
          deltaX: 1,
          deltaY: 1,
        },
        interval: 1000/60,  // 60 FPS
        aiDifficulty: 0.30
      };
  
    // game state
    const state = {
        player1: {
          x: 25,
          y: 175,
          score: 0
        },
        player2: {
          x: 565,
          y: 175,
          score: 0
        },
        ball: {
          x: settings.ball.x,
          y: settings.ball.y,
          deltaX: settings.ball.speed * settings.ball.deltaX,
          deltaY: settings.ball.speed * settings.ball.deltaY,
        },
        keysPressed: {},
        gameOver: false,
    };

    function updatePaddle1() {
        if (state.keysPressed['w']) {
          state.player1.y -= settings.paddle.speed;
        } else if (state.keysPressed['s']) {
          state.player1.y += settings.paddle.speed;
        }
      
        // check for paddle out-of-bounds
        if (state.player1.y < 0) {
          state.player1.y = 0;
        } else if (state.player1.y + settings.paddle.height > settings.board.height) {
          state.player1.y = settings.board.height - settings.paddle.height;
        }
      
        // update HTML element
        $('#player1').css('top', `${state.player1.y}px`);
    }

    function updatePaddle2() {
        const ballY = state.ball.y + settings.ball.radius / 2;
        const paddleY = state.player2.y + settings.paddle.height / 2;
      
        if (paddleY < ballY - 10) {
          state.player2.y += settings.paddle.speed  * settings.aiDifficulty;
        } else if (paddleY > ballY + 10) {
          state.player2.y -= settings.paddle.speed  * settings.aiDifficulty;
        }
      
        // check for paddle out-of-bounds
        if (state.player2.y < 0) {
          state.player2.y = 0;
        } else if (state.player2.y + settings.paddle.height > settings.board.height) {
          state.player2.y = settings.board.height - settings.paddle.height;
        }
      
        // update HTML element
        $('#player2').css('top', `${state.player2.y}px`);
    }

    function moveBall() {
        // update ball position
        state.ball.x += state.ball.deltaX;
        state.ball.y += state.ball.deltaY;

        // check for ball out-of-bounds
        if (state.ball.y < 0 || state.ball.y > settings.board.height - settings.ball.radius * 2) {
          state.ball.deltaY *= -1;
        }
      
        // check for paddle collision
        if (
          (state.ball.deltaX < 0 && state.ball.x < state.player1.x + settings.paddle.width && state.ball.y >= state.player1.y && state.ball.y <= state.player1.y + settings.paddle.height) ||
          (state.ball.deltaX > 0 && state.ball.x > state.player2.x - settings.ball.radius && state.ball.y >= state.player2.y && state.ball.y <= state.player2.y + settings.paddle.height)
        ) {
          state.ball.deltaX *= -1;
        }
      
        // check for game over
        if (state.ball.x < 0 || state.ball.x > settings.board.width - settings.ball.radius * 2) {
            state.gameOver = true;
        }
            
        // update HTML element
        $('#ball').css('top', `${state.ball.y}px`);
        $('#ball').css('left', `${state.ball.x}px`);
    }

    $(document).on('keydown', function(event) {
        if (event.code === 'ArrowUp') {
            state.player1.y -= settings.paddle.speed;
        } else if (event.code === 'ArrowDown') {
            state.player1.y += settings.paddle.speed;
        }
    });
    
    
    function resetBall() {
        state.ball.x = settings.board.width / 2 - settings.ball.radius;
        state.ball.y = settings.board.height / 2 - settings.ball.radius;


        // Choose a random initial direction for the ball
        const angle = Math.random() * Math.PI * 2;
        const angleOffset = (Math.random() - 0.5) * Math.PI / 6;
        state.ball.vx = Math.cos(angle + angleOffset) * settings.ballSpeed;
        state.ball.vy = Math.sin(angle + angleOffset) * settings.ballSpeed;
    }
  
    // game loop
    setInterval(function() {
        // update game state
        updatePaddle1(state.player1);
        updatePaddle2(state.player2, state.ball);
        moveBall(state.ball, state.player1, state.player2);
    
        // check for game over
        if (state.ball.x < 0) {
          state.player2.score++;
          resetBall();
        } else if (state.ball.x > settings.board.width - settings.ball.radius * 2) {
          state.player1.score++;
          resetBall();
        }
    
        // update HTML elements
        $('#paddle1').css('top', `${state.player1.y}px`);
        $('#paddle2').css('top', `${state.player2.y}px`);
        $('#ball').css('top', `${state.ball.y}px`);
        $('#ball').css('left', `${state.ball.x}px`);
        $('#score1').text(state.player1.score);
        $('#score2').text(state.player2.score);
    }, settings.interval);
  
    // loop();
});