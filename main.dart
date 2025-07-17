import 'package:flutter/material.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';
import 'dashboard_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await MobileAds.instance.initialize();
  runApp(MaterialApp(home: DashboardScreen()));
}
void main() async {
     WidgetsFlutterBinding.ensureInitialized();
     MobileAds.instance.initialize();
     runApp(MyApp());
   }