--2021-12-23 增加user表
DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名',
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '登录邮箱',
  `phone` bigint(20) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL COMMENT '头像',
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '用户状态 -1:未注册成功 0:禁用 1:正常',
  `role` tinyint(4) NOT NULL DEFAULT '1' COMMENT '角色 0:管理员 1:普通用户',
  `verify_key` varchar(255) DEFAULT NULL COMMENT '注册时验证码',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--2021-12-27 增加邮箱验证码列表
DROP TABLE IF EXISTS `EmailVerifyQueue`;
CREATE TABLE `EmailVerifyQueue` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `vcode` int NOT NULL,
  `errmsg` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  key (`email`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO zorq_api.`User` (id,name,email,phone,avatar,password,status,`role`,verify_key,created_at,updated_at,deleted_at) VALUES
	 ('1e48018d-580f-4b94-bbfb-20f7b124d921','admin','admin@mail.com',NULL,NULL,'ZorQ21232f297a57a5a743894a0e4a801fc3',1,0,NULL,'2023-06-07 13:06:02',NULL,NULL);

   INSERT INTO zorq_api.`User` (id,name,email,phone,avatar,password,status,`role`,verify_key,created_at,updated_at,deleted_at) VALUES
	 ('1e48018d-580f-4b94-bbfb-20f7b124d001','张三','zs@mail.com',NULL,NULL,'ZorQ21232f297a57a5a743894a0e4a801fc3',1,2,NULL,'2023-06-07 13:06:02',NULL,NULL);

   INSERT INTO zorq_api.`User` (id,name,email,phone,avatar,password,status,`role`,verify_key,created_at,updated_at,deleted_at) VALUES
	 ('1e48018d-580f-4b94-bbfb-20f7b124d002','李四','ls@mail.com',NULL,NULL,'ZorQ21232f297a57a5a743894a0e4a801fc3',1,2,NULL,'2023-06-07 13:06:02',NULL,NULL);



