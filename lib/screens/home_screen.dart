import 'package:flutter/material.dart';
import 'package:typeracer_clone_app/widgets/custom_button.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return Scaffold(
      body: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 800),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                'Create/Join a room to play!',
                style: TextStyle(
                  fontSize: 24,
                ),
              ),
              SizedBox(height: size.height * 0.1),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  CustomButton(
                    text: 'Create',
                    onPressed: () =>
                        Navigator.pushNamed(context, '/create-room'),
                    isHome: true,
                  ),
                  CustomButton(
                    text: 'Join',
                    onPressed: () => Navigator.pushNamed(context, '/join-room'),
                    isHome: true,
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
