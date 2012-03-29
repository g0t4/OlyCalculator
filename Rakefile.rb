require 'rake'
require 'albacore'

task :build_tablet do
	begin
		sh 'rd android\assets /s /q'
	rescue
	end
	sh 'xcopy src android\assets\www /S /I /Y'
	sh'cd android & ant debug -q'
end

task :deploy_tablet => [:build_tablet] do
	sh'cd android & ant installd -q'
end

task :run_tablet do
	sh'cd android & adb shell am start -a android.intent.action.MAIN -n com.OlyCalc/.OlyCalcApp'
end

task :push_tablet do
	sh'adb push src /sdcard/olycalc'
end