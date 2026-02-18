import 'dart:async';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
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
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
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

class _ColorSyncViewState extends State<ColorSyncView>
    with SingleTickerProviderStateMixin {
  Color _currentColor = const Color(0xFF3B82F6);
  BgType _bgType = BgType.color;
  Color _midTierColor = const Color(0xFF00FF00);
  Color _endTierColor = const Color(0xFF0000FF);
  bool _animationEffect = false;

  StreamSubscription? _configSub;
  AnimationController? _animController;

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 8),
    )..repeat();

    _animController!.addListener(() => setState(() {}));

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
    _animController?.dispose();
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
    return Scaffold(
      body: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        decoration: _buildDecoration(),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _buildCard(),
              const SizedBox(height: 48),
              Text(_statusText, style: _Styles.statusLabel),
            ],
          ),
        ),
      ),
    );
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

  BoxDecoration _buildDecoration() {
    if (_bgType == BgType.color) {
      return BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [_currentColor, _currentColor.withOpacity(0.7)],
        ),
      );
    }

    if (!_animationEffect) {
      return BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [_currentColor, _midTierColor, _endTierColor],
          stops: const [0.0, 0.5, 1.0],
        ),
      );
    }

    final t = _animController?.value ?? 0;
    final offset = _computeAnimOffset(t);

    return BoxDecoration(
      gradient: LinearGradient(
        begin: Alignment(-3.0 + offset.dx * 6.0, -3.0 + offset.dy * 6.0),
        end: Alignment(-3.0 + offset.dx * 6.0 + 1.41, -3.0 + offset.dy * 6.0 + 1.41),
        colors: [_currentColor, _midTierColor, _endTierColor],
        stops: const [0.0, 0.5, 1.0],
      ),
    );
  }

  Offset _computeAnimOffset(double t) {
    const keyframes = [
      Offset(0.0, 0.5),
      Offset(1.0, 0.5),
      Offset(1.0, 1.0),
      Offset(0.0, 1.0),
      Offset(0.0, 0.5),
    ];

    final segment = t * 4;
    final index = segment.floor().clamp(0, 3);
    final localT = segment - index;
    final eased = Curves.easeInOut.transform(localT);

    return Offset.lerp(keyframes[index], keyframes[index + 1], eased)!;
  }
}
