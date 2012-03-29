require 'rake'
require 'albacore'

task :build_tablet do
	sh 'xcopy src android\assets\www /S /I /Y'
end