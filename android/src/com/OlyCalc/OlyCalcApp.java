package com.OlyCalc;

import android.os.Bundle;
import org.apache.cordova.*;

public class OlyCalcApp extends DroidGap {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///sdcard/olycalc/calc.html");
    }
}