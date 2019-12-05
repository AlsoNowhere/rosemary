
public Guid Id { get; set; }

[Required]
public string Email { get; set; }

public bool EmailConfirmed { get; set; }

public bool LockoutEnabled { get; set; }

public DateTime LockoutEnd { get; set; }

public List<Fleet> Fleets { get; set; }

public Role Role { get; set; }

[Required]
[MinLength(3)]
[MaxLength(30)]
public string FirstName { get; set; }

[Required]
[MinLength(3)]
[MaxLength(30)]
public string LastName { get; set; }

public Guid IssuingAuthorityId { get; set; }

public DateTime LastLoggedIn { get; set; }

public int InActiveFor { get; set; }

