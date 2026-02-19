import 'dart:async';
import 'dart:math' as math;
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'firebase_options.dart';
import 'functions/realtime_db.dart';

class _Styles {
  static const title = TextStyle(
    fontSize: 32,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  );

  static const subtitle = TextStyle(
    fontSize: 20,
    color: Colors.white70,
  );

  static const hexLabel = TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.w600,
    color: Colors.white,
    fontFamily: 'monospace',
  );

  static const statusLabel = TextStyle(
    fontSize: 16,
    color: Colors.white70,
    fontStyle: FontStyle.italic,
  );

  static const cardPadding = EdgeInsets.all(32);
  static const hexPadding = EdgeInsets.symmetric(horizontal: 24, vertical: 12);

  static final cardDecoration = BoxDecoration(
    color: Colors.white.withOpacity(0.2),
    borderRadius: BorderRadius.circular(20),
    border: Border.all(
      color: Colors.white.withOpacity(0.3),
      width: 2,
    ),
  );

  static final hexDecoration = BoxDecoration(
    color: Colors.black.withOpacity(0.3),
    borderRadius: BorderRadius.circular(12),
  );
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  if (Firebase.apps.isEmpty) {
    await Firebase.initializeApp(
      options: DefaultFirebaseOptions.currentPlatform,
    );
  }
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Realtime Color Sync - View',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const ColorSyncView(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class ColorSyncView extends StatefulWidget {
  const ColorSyncView({super.key});

  @override
  State<ColorSyncView> createState() => _ColorSyncViewState();
}

class _ColorSyncViewState extends State<ColorSyncView> {
  Color _currentColor = const Color(0xFF3B82F6);
  BgType _bgType = BgType.color;
  Color _midTierColor = const Color(0xFF00FF00);
  Color _endTierColor = const Color(0xFF0000FF);
  bool _animationEffect = false;

  StreamSubscription? _configSub;

  @override
  void initState() {
    super.initState();

    _configSub = listenBgConfig().listen((config) {
      if (config == null) return;
      setState(() {
        _bgType = config.bgType;
        _currentColor = _hexToColor(config.colors.color);
        _midTierColor = _hexToColor(config.colors.midTier);
        _endTierColor = _hexToColor(config.colors.endTier);
        _animationEffect = config.animationEffect;
      });
    });
  }

  @override
  void dispose() {
    _configSub?.cancel();
    super.dispose();
  }

  Color _hexToColor(String hex) {
    hex = hex.replaceFirst('#', '');
    if (hex.length == 6) hex = 'FF$hex';
    return Color(int.parse(hex, radix: 16));
  }

  String _colorToHex(Color color) {
    return '#${color.value.toRadixString(16).substring(2).toUpperCase()}';
  }

  String get _statusText {
    if (_bgType == BgType.color) return 'Solid Color';
    return _animationEffect ? 'Gradient' : 'Gradient';
  }

  @override
  Widget build(BuildContext context) {
    final content = Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          _buildCard(),
          const SizedBox(height: 48),
          Text(_statusText, style: _Styles.statusLabel),
        ],
      ),
    );

    return Scaffold(body: _buildBackground(content));
  }

  Widget _buildCard() {
    return Container(
      padding: _Styles.cardPadding,
      decoration: _Styles.cardDecoration,
      child: Column(
        children: [
          const Icon(Icons.palette, size: 80, color: Colors.white),
          const SizedBox(height: 24),
          const Text('Realtime Color Sync', style: _Styles.title),
          const SizedBox(height: 16),
          const Text('View', style: _Styles.subtitle),
          const SizedBox(height: 32),
          Container(
            padding: _Styles.hexPadding,
            decoration: _Styles.hexDecoration,
            child: Text(_colorToHex(_currentColor), style: _Styles.hexLabel),
          ),
        ],
      ),
    );
  }

  Widget _buildBackground(Widget child) {
    if (_bgType == BgType.color) {
      return AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomCenter,
            colors: [_currentColor, _currentColor.withOpacity(0.7)],
          ),
        ),
        child: child,
      );
    }

    if (!_animationEffect) {
      return AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [_currentColor, _midTierColor, _endTierColor],
            stops: const [0.0, 0.5, 1.0],
          ),
        ),
        child: child,
      );
    }

    return Animate(
      onPlay: (controller) => controller.repeat(),
      effects: [
        CustomEffect(
          begin: 0,
          end: 1,
          duration: const Duration(seconds: 8),
          curve: Curves.linear,
          builder: (context, value, child) {
            final offset = _computeAnimOffset(value as double);
            return DecoratedBox(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment(-3.0 + offset.dx * 6.0, -3.0 + offset.dy * 6.0),
                  end: Alignment(-3.0 + offset.dx * 6.0 + 1.41, -3.0 + offset.dy * 6.0 + 1.41),
                  colors: [_currentColor, _midTierColor, _endTierColor],
                  stops: const [0.0, 0.5, 1.0],
                ),
              ),
              child: child,
            );
          },
        ),
      ],
      child: child,
    );
  }

  Offset _computeAnimOffset(double t) {
    final angle = t * 2 * math.pi;
    return Offset(0.5 + 0.5 * math.cos(angle), 0.5 + 0.5 * math.sin(angle));
  }
}
