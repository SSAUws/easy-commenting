package com.example.main;

import android.os.Bundle;
import org.apache.cordova.*;

public class main_activity extends DroidGap
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
    }
}