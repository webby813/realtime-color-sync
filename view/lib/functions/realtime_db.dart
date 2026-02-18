import 'dart:async';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_database/firebase_database.dart';

enum BgType { color, gradient }

class BgColors {
  final String color;
  final String midTier;
  final String endTier;
  final String? image;

  const BgColors({
    required this.color,
    required this.midTier,
    required this.endTier,
    this.image,
  });

  factory BgColors.fromMap(Map<String, dynamic> map) {
    return BgColors(
      color: map['color'] as String? ?? '#ff0000',
      midTier: map['midTier'] as String? ?? '#00ff00',
      endTier: map['endTier'] as String? ?? '#0000ff',
      image: map['image'] as String?,
    );
  }
}

class BgConfig {
  final BgType bgType;
  final BgColors colors;
  final bool animationEffect;

  const BgConfig({
    required this.bgType,
    required this.colors,
    required this.animationEffect,
  });

  factory BgConfig.fromMap(Map<String, dynamic> map) {
    return BgConfig(
      bgType: map['bgType'] == 'gradient' ? BgType.gradient : BgType.color,
      colors: BgColors.fromMap(
        Map<String, dynamic>.from(map['colors'] as Map? ?? {}),
      ),
      animationEffect: map['animationEffect'] as bool? ?? false,
    );
  }
}

DatabaseReference get _dbRef {
  final db = FirebaseDatabase.instanceFor(
    app: Firebase.app(),
    databaseURL: Firebase.app().options.databaseURL,
  );
  return db.ref('backgroundConfig');
}

Future<BgConfig?> readBgConfig() async {
  final snapshot = await _dbRef.get();
  if (!snapshot.exists || snapshot.value == null) return null;
  return BgConfig.fromMap(Map<String, dynamic>.from(snapshot.value as Map));
}

Stream<BgConfig?> listenBgConfig() {
  return _dbRef.onValue.map((event) {
    final data = event.snapshot.value;
    if (data == null) return null;
    return BgConfig.fromMap(Map<String, dynamic>.from(data as Map));
  });
}
