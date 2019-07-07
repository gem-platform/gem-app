# Database Migrations

## Create migration

```sh
alembic revision -m "create proposal table"
```

## Example

```py
def upgrade():
    op.create_table(
        'user',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('username', sa.String(250), nullable=False),
    )


def downgrade():
    op.drop_table('user')
```

## Useful commands 

### Apply migration

```sh
alembic upgrade head
```

### Show history

```sh
alembic history
```

### Current head revision

```sh
alembic current
```