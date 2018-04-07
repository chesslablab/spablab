<?php
namespace ReactPgnChess;

use PGNChess\Game;
use PGNChess\PGN\Symbol;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class PgnChessGame implements MessageComponentInterface {

    private $client;

    private $game;

    public function __construct() {
        echo "New ReactPgnChess game!\n";
    }

    public function onOpen(ConnectionInterface $conn) {
        $this->client = $conn;
        $this->game = new Game;

        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
      $move = explode(' ', $msg);
      try {
          $isLegalMove = $this->game->play($move[0], $move[1]);
      } catch(\Exception $e) {
          echo "{$e->getMessage()}\n";
      }

      $this->client->send(json_encode($isLegalMove));
    }

    public function onClose(ConnectionInterface $conn) {
        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }
}
