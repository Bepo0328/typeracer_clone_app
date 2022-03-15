import 'package:flutter/material.dart';

class CustomButton extends StatelessWidget {
  const CustomButton({
    Key? key,
    required this.text,
    required this.onPressed,
    this.isHome = false,
  }) : super(key: key);
  final String text;
  final VoidCallback onPressed;
  final bool isHome;

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    return ElevatedButton(
      onPressed: onPressed,
      child: Text(
        text,
        style: const TextStyle(
          fontSize: 16,
          color: Colors.white,
        ),
      ),
      style: ElevatedButton.styleFrom(
        minimumSize: Size(
          !isHome ? width : width / 5,
          50,
        ),
      ),
    );
  }
}
