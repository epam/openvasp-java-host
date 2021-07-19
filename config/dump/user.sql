CREATE USER 'ovasp'@'%' IDENTIFIED BY 'secret_pass2021';
GRANT ALL PRIVILEGES ON `ovasp-1`.* TO 'ovasp'@'%';
GRANT ALL PRIVILEGES ON `ovasp-2`.* TO 'ovasp'@'%';