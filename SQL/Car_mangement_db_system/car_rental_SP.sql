USE [carDb];
GO

CREATE OR ALTER PROCEDURE sp_Insert
    @TableName NVARCHAR(128),
    @Columns NVARCHAR(MAX),
    @Values NVARCHAR(MAX)
AS
BEGIN
    DECLARE @SQL NVARCHAR(MAX);

    SET @SQL = N'INSERT INTO ' + QUOTENAME(@TableName) +
               ' (' + @Columns + ') VALUES ' + @Values + ';';

    -- Print the SQL for debugging
    PRINT @SQL;

    EXEC sp_executesql @SQL;
END;
GO



--Read SP
CREATE OR ALTER PROCEDURE sp_Read
    @TableName NVARCHAR(128),
    @Condition NVARCHAR(MAX) = NULL
AS
BEGIN
    DECLARE @SQL NVARCHAR(MAX);
    SET @SQL = N'SELECT * FROM ' + @TableName;
    IF @Condition IS NOT NULL
        SET @SQL += ' WHERE ' + @Condition;
    EXEC sp_executesql @SQL;
END;
GO

-- Update SP 
CREATE OR ALTER PROCEDURE sp_Update
    @TableName NVARCHAR(128),
    @SetClause NVARCHAR(MAX),
    @Condition NVARCHAR(MAX)
AS
BEGIN
    DECLARE @SQL NVARCHAR(MAX);
    SET @SQL = N'UPDATE ' + @TableName + ' SET ' + @SetClause + ' WHERE ' + @Condition;
    EXEC sp_executesql @SQL;
END;
GO

--Delete SP
CREATE OR ALTER PROCEDURE sp_Delete
    @TableName NVARCHAR(128),
    @Condition NVARCHAR(MAX)
AS
BEGIN
    DECLARE @SQL NVARCHAR(MAX);
    SET @SQL = N'DELETE FROM ' + @TableName + ' WHERE ' + @Condition;
    EXEC sp_executesql @SQL;
END;
GO
