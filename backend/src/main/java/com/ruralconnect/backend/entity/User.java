package com.ruralconnect.backend.entity;

import com.ruralconnect.backend.enums.UserRole;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "users", indexes = {
		@Index(name = "idx_users_email", columnList = "email"),
		@Index(name = "idx_users_phone", columnList = "phone"),
		@Index(name = "idx_users_role", columnList = "role"),
		@Index(name = "idx_users_email_phone", columnList = "email,phone")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "full_name", nullable = false)
	private String fullName;

	@Column(nullable = false)
	private Integer age;

	@Column(nullable = false, unique = true)
	private String email;

	@Column(nullable = false, unique = true)
	private String phone;

	@Column(nullable = false, columnDefinition = "TEXT")
	private String address;

	@Column(nullable = false, length = 6)
	private String pincode;

	@Column(nullable = false)
	private String password;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private UserRole role;

	@Column(name = "village_name")
	private String villageName;

	@Column(name = "district_name")
	private String districtName;

	@Column(name = "office_id")
	private String officeId;

	@CreationTimestamp
	@Column(name = "created_at", updatable = false)
	private LocalDateTime createdAt;

	@UpdateTimestamp
	@Column(name = "updated_at")
	private LocalDateTime updatedAt;
}

