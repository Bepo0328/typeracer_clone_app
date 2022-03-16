import 'package:flutter/cupertino.dart';
import 'package:provider/provider.dart';
import 'package:typeracer_clone_app/providers/game_state_provider.dart';
import 'package:typeracer_clone_app/utils/socket_client.dart';

class SocketMethods {
  final _socketClient = SocketClient.instance.socket!;

  // create game
  createGame(String nickname) {
    if (nickname.isNotEmpty) {
      _socketClient.emit('create-game', {
        'nickname': nickname,
      });
    }
  }

  updateGameListener(BuildContext context) {
    _socketClient.on('updateGame', (data) {
      final gameStateProvider =
          Provider.of<GameStateProvider>(context).updateGameState(
        id: id,
        players: players,
        isJoin: isJoin,
        isOver: isOver,
        words: words,
      );
      debugPrint(data);
    });
  }
}
