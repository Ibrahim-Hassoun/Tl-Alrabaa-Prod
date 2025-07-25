-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: tl_alrabaa
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addresses` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `country` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) DEFAULT NULL,
  `street` varchar(255) NOT NULL,
  `building` varchar(255) DEFAULT NULL,
  `apartment` varchar(255) DEFAULT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `addresses_user_id_foreign` (`user_id`),
  CONSTRAINT `addresses_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart_items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `product_id` bigint(20) unsigned NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cart_items_user_id_product_id_unique` (`user_id`,`product_id`),
  KEY `cart_items_product_id_foreign` (`product_id`),
  KEY `cart_items_quantity_index` (`quantity`),
  CONSTRAINT `cart_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `parent_id` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_slug_unique` (`slug`),
  KEY `categories_parent_id_foreign` (`parent_id`),
  CONSTRAINT `categories_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'tobacco','tobacco',NULL,NULL,NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2025_07_02_190638_addresses',1),(5,'2025_07_02_191253_create_categories_table',1),(6,'2025_07_02_191516_create_products_table',1),(7,'2025_07_02_191649_create_tags_table',1),(8,'2025_07_02_191719_create_product_tag_table',1),(9,'2025_07_02_192027_create_cart_items_table',1),(10,'2025_07_02_192126_create_orders_table',1),(11,'2025_07_02_192226_create_order_items_table',1),(12,'2025_07_02_204017_create_personal_access_tokens_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) unsigned NOT NULL,
  `product_id` bigint(20) unsigned NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_order_id_foreign` (`order_id`),
  KEY `order_items_product_id_foreign` (`product_id`),
  CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `address_id` bigint(20) unsigned NOT NULL,
  `status` enum('pending','confirmed','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending',
  `total_price` decimal(10,2) NOT NULL,
  `payment_method` enum('cod','card') NOT NULL DEFAULT 'cod',
  `payment_status` enum('unpaid','paid','failed') NOT NULL DEFAULT 'unpaid',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_user_id_foreign` (`user_id`),
  KEY `orders_address_id_foreign` (`address_id`),
  CONSTRAINT `orders_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON DELETE CASCADE,
  CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_tag`
--

DROP TABLE IF EXISTS `product_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_tag` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) unsigned NOT NULL,
  `tag_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_tag_product_id_foreign` (`product_id`),
  KEY `product_tag_tag_id_foreign` (`tag_id`),
  CONSTRAINT `product_tag_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_tag_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_tag`
--

LOCK TABLES `product_tag` WRITE;
/*!40000 ALTER TABLE `product_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `discount_price` decimal(8,2) DEFAULT NULL,
  `on_sale` tinyint(1) NOT NULL DEFAULT 0,
  `stock_quantity` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `category_id` bigint(20) unsigned NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `attributes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`attributes`)),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_slug_unique` (`slug`),
  KEY `products_category_id_foreign` (`category_id`),
  CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Orange','orange','A zesty and tangy orange flavor with a burst of citrus freshness.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/eX3zkk8cTHFWXa5MDjFk36OVYYHTOxJXmwipnZJ2.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"cool\",\"weight\":\"50g\"}',NULL,'2025-07-08 10:38:20','2025-07-08 10:38:20'),(2,'Melon','melon','A light and juicy melon flavor with a smooth, subtly sweet profile.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/tf5skw8sovYsFAFSGwa2wJR4aD8uszvUTGqelqqe.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"sweet\",\"weight\":\"50g\"}',NULL,'2025-07-08 13:03:17','2025-07-08 13:03:17'),(3,'Peach','peach','A sweet and juicy peach flavor with a smooth, mellow finish.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/79522xhojm6pm3gV2BTPWQOuy1S7XwX3e5hV9bDX.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"fruity\",\"weight\":\"50g\"}',NULL,'2025-07-08 13:04:04','2025-07-08 13:04:04'),(4,'White Grape','white-grape','A classic, juicy grape flavor with a rich, sweet profile and a smooth finish.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/G1KQBzCjL3nEMfFcNBw2nuFVidPAZ3xquOVVxbtu.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"fruity\",\"weight\":\"50g\"}',NULL,'2025-07-08 13:05:03','2025-07-08 13:05:03'),(5,'Love 66','love-66','A tropical explosion of passion fruit, watermelon, and mint for a sweet and cooling sensation.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/JnFQ5zRdgAZvkd7NWlrYHB3RWjP4w0WnOOBQ79Vy.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"sour\",\"weight\":\"50g\"}',NULL,'2025-07-08 13:07:57','2025-07-08 13:07:57'),(6,'Gum and Melon','gum-and-melon','A refreshing mix of juicy melon and sweet chewing gum for a smooth, candy-like flavor.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/oZxfE1EFwbXWjuIK7fq27bjBW2321ryd55RXLKcf.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"sweet\",\"weight\":\"50g\"}',NULL,'2025-07-08 13:09:05','2025-07-08 13:09:05'),(7,'Princess','princess','A sweet and fruity flavor crafted especially for lady lovers, with a smooth and playful charm.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/6SgyhcHBmeOMjRBo9n3AvEmNeBqc0Rf1do5aWdqx.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"sweet\",\"weight\":\"50g\"}',NULL,'2025-07-08 13:09:38','2025-07-08 13:09:38'),(8,'Black Twist Flavor','black-twist-flavor','A bold, earthy, and smoky flavor with deep fermented notes — a special TL Alrabaa classic for strong tobacco lovers.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/BDDMJUFJ9KKdumfgax6vZCp2UUce9NTfFjjO7oth.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"sour\",\"weight\":\"50g\"}',NULL,'2025-07-08 13:10:22','2025-07-08 13:10:22'),(9,'Lady Killer','lady-killer','A seductive mix of tropical fruits, mint, and floral notes for a smooth yet bold flavor.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/3WBXQem4nZRXkUFPF6aZkc6jXYCn6BPNQ5qmYi1U.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"cool\",\"weight\":\"50g\"}',NULL,'2025-07-08 13:11:03','2025-07-08 13:11:03'),(10,'Mastic Gum','mastic-gum','A unique and aromatic flavor with pine-like, herbal notes reminiscent of traditional Mediterranean mastic gum.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/CmH7BLYQvAQ9KdgGgUmqg5SCfTH8NELZkJxf7rnU.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"sweet\",\"weight\":\"50g\"}',NULL,'2025-07-08 13:12:31','2025-07-08 13:12:31'),(11,'Strawberry and Gum','strawberry-and-gum','A playful blend of sweet chewing gum and ripe strawberry for a candy-like, fruity flavor.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/G1wNmxefqJQiE8YzQ7LNIUen4wAiHq72PMholSmn.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"sweet\",\"weight\":\"50g\"}',NULL,'2025-07-08 13:13:58','2025-07-08 13:13:58'),(12,'Black Grape','black-grape','A rich and tangy black grape flavor with deep, fruity notes and a smooth exhale.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/Cy6q9YWwXRLcx7lBt9vnjLkdO78s7pafNvGtMueS.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"fruity\",\"weight\":\"50g\"}',NULL,'2025-07-08 13:14:49','2025-07-08 13:14:49'),(13,'Baghdadi','baghdadi','A crisp winter blend of sour and cool fruits, delivering a refreshing and invigorating smoke.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/z4LNcwmPysJrRU2g4WdPGaGpiphOIcc3IsldHbzT.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"cool\",\"weight\":\"50g\"}',NULL,'2025-07-08 13:16:42','2025-07-08 13:16:42'),(14,'Havana','havana','A deep, robust flavor inspired by Cuban cigars, with earthy, smoky, and slightly sweet notes — finished with a breeze of Cold Hawaii freshness.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/12V19YwrGpffDUTBVfEKLQzpZKMsouHoM7Qvmzl0.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"sweet\",\"weight\":\"50g\"}',NULL,'2025-07-08 13:21:11','2025-07-08 13:21:11'),(15,'Vanilla','vanilla','A smooth and creamy vanilla flavor with a warm, sweet aroma.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/HKePYsoluriwl5ZHwbxzcpUCRAD0OsYktYDixy2a.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"sweet\",\"weight\":\"50g\"}',NULL,'2025-07-08 13:22:30','2025-07-08 13:22:30'),(16,'Watermelon and Melon','watermelon-and-melon','A refreshing blend of juicy watermelon and mellow melon for a light, fruity smoke.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/NOJfvqWNAqpRE5LO7r7LuSQA9Np1ajB0RLEfIXvz.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"fruity\",\"weight\":\"50g\"}',NULL,'2025-07-08 13:23:17','2025-07-08 13:23:17'),(17,'Two Apples','two-apples','A classic blend of sweet red apple and tangy green apple for a balanced, fruity flavor with a hint of spice.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/bWUG2oOedrSyyDZf8u4au3oAAtKC1GVZcfW7oA52.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"fruity\",\"weight\":\"50g\"}',NULL,'2025-07-08 13:23:56','2025-07-08 13:23:56'),(18,'Watermelon','watermelon','A juicy and refreshing watermelon flavor with a sweet, fruity twist — a TL Alrabaa summertime favorite.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/fInBly1uWHc90IudVnJGVL3NjGMbEQjwnIM0LoQ4.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"fruity\",\"weight\":\"50g\"}',NULL,'2025-07-08 13:24:27','2025-07-08 13:24:27'),(19,'Mint','mint','A sweet, juicy grape flavor balanced with a cool, refreshing mint finish.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/LAg4ZHTgCAhpnqR0mSFooPDtCmDuioISTfo2jvaR.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"cool\",\"weight\":\"50g\"}',NULL,'2025-07-08 13:25:16','2025-07-08 13:25:16'),(20,'Deja Vu','deja-vu','A rich, layered flavor with hints of dark berries and a touch of sweetness that leaves a lasting impression.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/DClMfszk7uOxTYZjYBPyb4vtUB7LKqt7SBRsraTV.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"fruity\",\"weight\":\"50g\"}',NULL,'2025-07-08 13:26:03','2025-07-08 13:26:03'),(21,'Magic Mix','magic-mix','A vibrant fusion of fruity flavors that delivers a sweet and mysterious experience — a signature TL Alrabaa magic.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/5fMhSLmHbZVdPioCTrend9NMWdi4aKxCvBcXhJx2.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"fruity\",\"weight\":\"50g\"}',NULL,'2025-07-08 13:26:41','2025-07-08 13:26:41'),(22,'Lemon','lemon','A bright and zesty lemon flavor bursting with citrus tang and refreshing zest.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/1snTgBfKZg9voC5WBGq5zKJ0PJATjOsqa1yuh8rE.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"sour\",\"weight\":\"50g\"}',NULL,'2025-07-08 13:29:49','2025-07-08 13:29:49'),(23,'Mint and Gum','mint-and-gum','A crisp and refreshing fusion of sweet chewing gum and cool mint for an icy, smooth smoke.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/XhJReOd0XdscwFU9WAXOjEJMZF0GRinvoIZbjqqE.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"cool\",\"weight\":\"50g\"}',NULL,'2025-07-08 13:30:38','2025-07-08 13:30:38'),(24,'French Bordeaux','french-bordeaux','A sophisticated grape flavor inspired by French Bordeaux, offering rich, dark fruit notes with a hint of elegance.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/QihsSsnzOcU9LQMbBIhedX9MTS0XU7SOxR8aVxrg.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"fruity\",\"weight\":\"50g\"}',NULL,'2025-07-08 13:32:15','2025-07-08 13:32:15'),(25,'Gum','gum','A refreshing and sweet minty flavor that mimics classic chewing gum.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/WS98szDs3k1UxB5xqIYOwgUZODCTxJolSBBbOkkv.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"sweet\",\"weight\":\"50g\"}',NULL,'2025-07-08 13:32:54','2025-07-08 13:32:54'),(26,'Grapes and Mint','grapes-and-mint','A sweet, juicy grape flavor balanced with a cool, refreshing mint finish.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/V28UGWbWWVk05Fq7kCke7kvmDZFlO4yI6A95q6Le.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"cool\",\"weight\":\"50g\"}',NULL,'2025-07-08 13:33:46','2025-07-08 13:33:46'),(27,'Dalali','dalali','Cool and sweet Tl-Alrabaa special flavor.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/kTwyf75P5a7SlOGwoc4KemGqv1z0nXXjaPpWZAtE.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"cool\",\"weight\":\"50g\"}',NULL,'2025-07-08 13:34:19','2025-07-08 13:34:19'),(28,'Aghatti','aghatti','A vibrant winter blend of fruity, sour, and sweet flavors that delivers a refreshing and cozy smoking experience.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/w9Oju4MSl7Ki1XsibZZ8OJuCm6c1fC6vhAHjvy2h.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"cool\",\"weight\":\"50g\"}',NULL,'2025-07-08 13:36:08','2025-07-08 13:36:08'),(29,'English','english','English flavor offers a rich, smoky blend with earthy, woody notes — inspired by traditional British pipe tobacco.',1250.00,NULL,0,0,'AWS_URL=https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/6vw8vXwc8nemJyJ2jVkK4qyaGhP3LLjJlm6hgauG.jpg',1,1,'{\"category\":\"tobacco\",\"flavor\":\"cool\",\"weight\":\"50g\"}',NULL,'2025-07-08 13:36:38','2025-07-08 13:36:38');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tags` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tags_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'kamaran','shabak','kimo1962@gmail.com',NULL,'$2y$12$mrT6Js3g3.QOKEHf8NtJM.PYu3M8ohjfXt43WT1lmjs4PGM.VYTuS',NULL,'admin',NULL,'2025-07-08 10:29:33','2025-07-08 10:29:33');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-08 20:08:10
