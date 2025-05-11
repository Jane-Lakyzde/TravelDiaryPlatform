为旅游日记平台设计数据库时，需满足用户系统和审核管理系统的核心功能需求。以下是推荐的数据库表结构及说明：

---

### **1. 用户表（`users`）**
| 字段名          | 类型        | 约束/说明                          |
|-----------------|-------------|------------------------------------|
| `user_id`       | INT         | 主键，自增                         |
| `username`      | VARCHAR(50) | 唯一索引，用于登录                 |
| `password_hash` | VARCHAR(64) | 加密存储（如SHA-256）              |
| `nickname`      | VARCHAR(50) | 唯一索引，用户昵称                 |
| `avatar_url`    | VARCHAR(255)| 用户头像URL，默认值指向默认头像     |
| `created_at`    | DATETIME    | 用户注册时间                       |
| `updated_at`    | DATETIME    | 最后更新时间                       |

---

### **2. 游记表（`travel_notes`）**
| 字段名          | 类型         | 约束/说明                          |
|-----------------|--------------|------------------------------------|
| `note_id`       | INT          | 主键，自增                         |
| `user_id`       | INT          | 外键，关联`users.user_id`          |
| `title`         | VARCHAR(100) | 非空，游记标题                     |
| `content`       | TEXT         | 非空，游记正文                     |
| `status`        | ENUM         | 值：`pending`（待审核）、`approved`（已通过）、`rejected`（未通过） |
| `reject_reason` | TEXT         | 审核拒绝原因（仅当`status=rejected`时有效） |
| `is_deleted`    | BOOLEAN      | 逻辑删除标记（默认`false`）         |
| `created_at`    | DATETIME     | 游记创建时间                       |
| `updated_at`    | DATETIME     | 最后更新时间                       |

---

### **3. 媒体资源表（`media`）**
| 字段名          | 类型         | 约束/说明                          |
|-----------------|--------------|------------------------------------|
| `media_id`      | INT          | 主键，自增                         |
| `note_id`       | INT          | 外键，关联`travel_notes.note_id`   |
| `type`          | ENUM         | 值：`image`（图片）、`video`（视频）|
| `file_url`      | VARCHAR(255) | 文件存储路径或云服务URL            |
| `order`         | INT          | 排序字段（用于图片轮播顺序）       |
| `created_at`    | DATETIME     | 上传时间                           |

**注意**：  
- 每篇游记可上传多张图片（`type=image`）和一个视频（`type=video`），需在应用层校验视频数量限制。
- 图片需在上传前压缩，数据库中仅存储压缩后的URL。

---

### **4. 审核记录表（`audit_logs`）**
| 字段名          | 类型         | 约束/说明                          |
|-----------------|--------------|------------------------------------|
| `audit_id`      | INT          | 主键，自增                         |
| `note_id`       | INT          | 外键，关联`travel_notes.note_id`   |
| `auditor_id`    | INT          | 外键，关联`users.user_id`（审核员）|
| `action`        | ENUM         | 值：`approve`（通过）、`reject`（拒绝）、`delete`（删除） |
| `reason`        | TEXT         | 操作原因（拒绝或删除时必填）       |
| `created_at`    | DATETIME     | 操作时间                           |

---

### **5. 角色表（`roles`）与用户角色关联表（`user_roles`）**
**角色表（`roles`）**  
| 字段名      | 类型         | 约束/说明                  |
|-------------|--------------|---------------------------|
| `role_id`   | INT          | 主键，自增                |
| `role_name` | ENUM         | 值：`admin`（管理员）、`auditor`（审核员） |

**用户角色关联表（`user_roles`）**  
| 字段名      | 类型 | 约束/说明                          |
|-------------|------|------------------------------------|
| `user_id`   | INT  | 外键，关联`users.user_id`          |
| `role_id`   | INT  | 外键，关联`roles.role_id`          |

---

### **关键设计说明**
1. **逻辑删除**：游记表中使用`is_deleted`标记逻辑删除，避免物理删除数据。
2. **媒体管理**：通过`media`表分离媒体资源，支持多图一视频，并通过`order`字段控制图片展示顺序。
3. **审核追踪**：`audit_logs`表记录所有审核操作，便于追溯历史。
4. **角色权限**：通过`roles`和`user_roles`表实现RBAC（基于角色的访问控制），管理员可执行全部操作，审核员仅限审核。

---

### **优化建议**
- **索引优化**：在常用查询字段（如`users.username`、`travel_notes.status`）添加索引。
- **分页查询**：游记列表分页加载时，使用`LIMIT/OFFSET`或游标分页（推荐后者避免深度分页性能问题）。
- **云存储**：图片和视频使用云服务存储（如阿里云OSS），降低服务器压力。
- **缓存机制**：对高频访问的游记列表使用Redis缓存，提升响应速度。

通过以上设计，可满足用户发布、审核管理、多角色权限等核心功能，同时兼顾扩展性和性能。