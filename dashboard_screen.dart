import 'package:flutter/material.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';

class DashboardScreen extends StatefulWidget {
  @override
  _DashboardScreenState createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  int balance = 0;
  RewardedAd? _rewardedAd;

late BannerAd _bannerAd;
   bool _isBannerAdLoaded = false;

  @override
  void initState() {
    super.initState();
    _loadRewardedAd();
    _loadBannerAd();
  }
  // Aapka banner ad unit ID
   void _loadBannerAd() {
     _bannerAd = BannerAd(
       adUnitId: 'ca-app-pub-7372972198365446/2878119161'
       size: AdSize.banner,
       request: AdRequest(),
       listener: BannerAdListener(
         onAdLoaded: (_) {
           setState(() {
             _isBannerAdLoaded = true;
           });
         },
         onAdFailedToLoad: (ad, error) {
           ad.dispose();
           print('Banner failed to load: $error');
         },
       ),
     );

     _bannerAd.load();
   }
 // Aapka spin rewarded ad unit ID
  void _loadRewardedAd() {
    RewardedAd.load(
      adUnitId: 'ca-app-pub-7372972198365446/6845284335', 
      request: AdRequest(),
      rewardedAdLoadCallback: RewardedAdLoadCallback(
        onAdLoaded: (RewardedAd ad) {
          print('Rewarded Ad Loaded');
          _rewardedAd = ad;
        },
        onAdFailedToLoad: (LoadAdError error) {
          print('Rewarded Ad Failed to Load: $error');
          _rewardedAd = null;
        },
      ),
    );
  }

  void _showRewardedAd() {
    if (_rewardedAd != null) {
      _rewardedAd!.show(onUserEarnedReward:) (AdWithoutView ad, RewardItem reward) 
          setState(() 
            balance += reward.amount.toInt();
          );
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('You earned{reward.amount} coins!')),
          );
        },
      
      _rewardedAd = null;
      _loadRewardedAd(); 
      // Load next ad after current one shown
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Ad not loaded yet, please wait.")),
      );
    }
  }

  void _withdraw() {
    if (balance >= 10) {
      setState(() {
        balance = 0;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Withdraw Request Sent")),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Minimum 10 Coins Required")),
      );
    }
  }

  @override
void dispose() {
  _rewardedAd?.dispose();
  _bannerAd.dispose();
  super.dispose();
}
 @override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(title: Text("Earning Dashboard")),
    body: Padding(
      padding: const EdgeInsets.all(20.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text("Balance: $balance", style: TextStyle(fontSize: 30)),
          SizedBox(height: 30),
          ElevatedButton(
            onPressed: _showRewardedAd,
            child: Text("Watch Ad & Earn"),
          ),
          SizedBox(height: 20),
          ElevatedButton(
            onPressed: _withdraw,
            child: Text("Withdraw"),
          ),
          SizedBox(height: 20),
          if (_isBannerAdLoaded)
            Container(
              height: _bannerAd.size.height.toDouble(),
              width: _bannerAd.size.width.toDouble(),
              child: AdWidget(ad: _bannerAd),
            ),
        ],
      ),
    ),
  );
}
