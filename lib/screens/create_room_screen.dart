import 'package:flutter/material.dart';
import 'package:typeracer_clone_app/utils/socket_client.dart';
import 'package:typeracer_clone_app/widgets/custom_button.dart';
import 'package:typeracer_clone_app/widgets/custom_text_field.dart';

class CreateRoomScreen extends StatefulWidget {
  const CreateRoomScreen({Key? key}) : super(key: key);

  @override
  State<CreateRoomScreen> createState() => _CreateRoomScreenState();
}

class _CreateRoomScreenState extends State<CreateRoomScreen> {
  final TextEditingController _nameController = TextEditingController();
  final SocketClient _socketClient = SocketClient.instance;

  @override
  void dispose() {
    super.dispose();
    _nameController.dispose();
  }

  testing() {
    _socketClient.socket!.emit('test', 'This is working!');
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return Scaffold(
      body: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 800),
          child: Container(
            margin: const EdgeInsets.symmetric(horizontal: 20),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const Text(
                  'Create Room',
                  style: TextStyle(
                    fontSize: 30,
                  ),
                ),
                SizedBox(height: size.height * 0.08),
                CustomTextField(
                  controller: _nameController,
                  hintText: 'Enter your nickname',
                ),
                const SizedBox(height: 30),
                CustomButton(
                  text: 'Create',
                  onPressed: testing,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
