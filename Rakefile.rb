require 'rake'
require 'albacore'

task :build_tablet do
	begin
		sh 'rd android\assets /s /q'
	rescue
	end
	sh 'xcopy src android\assets\www /S /I /Y'
end

task :deploy_tablet => [:build_tablet] do
	sh'cd android & android update project -p . -t "android-14" -s'
	sh'cd android & ant debug install -q'
end
