/// <reference path="BaseService.d.ts" />
//
// Autogenerated by Thrift Compiler (0.9.2)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


  /**
   * 读操作，需要1个读配额
   */
  get(request: GetRequest): GetResult;

  /**
   * 读操作，需要1个读配额
   */
  get(request: GetRequest, callback: Function): void;

  /**
   * 写操作，需要1个写配额，另外每个Eager二级索引需要1个额外读配额
   */
  put(request: PutRequest): PutResult;

  /**
   * 写操作，需要1个写配额，另外每个Eager二级索引需要1个额外读配额
   */
  put(request: PutRequest, callback: Function): void;

  /**
   * 自增操作，需要读写配额各1
   */
  increment(request: IncrementRequest): IncrementResult;

  /**
   * 自增操作，需要读写配额各1
   */
  increment(request: IncrementRequest, callback: Function): void;

  /**
   * 删除操作，需要1个写配额，另外每个Eager二级索引需要1个额外读配额
   */
  remove(request: RemoveRequest): RemoveResult;

  /**
   * 删除操作，需要1个写配额，另外每个Eager二级索引需要1个额外读配额
   */
  remove(request: RemoveRequest, callback: Function): void;

  /**
   * 扫描操作，每个扫描过的记录消耗1个读配额(即使不满足过滤条件)，每个Lazy二级索引需要1个额外读配额
   */
  scan(request: ScanRequest): ScanResult;

  /**
   * 扫描操作，每个扫描过的记录消耗1个读配额(即使不满足过滤条件)，每个Lazy二级索引需要1个额外读配额
   */
  scan(request: ScanRequest, callback: Function): void;

  /**
   * 批量读写操作，消耗各自对应的读写配额。同一个batch中多个操作修改同一行数据可能导致未定义行为（数据不一致），
   * 应当避免，另外如果一个batch包含同一行的读和写操作，其执行顺序是不确定的，不推荐使用
   */
  batch(request: BatchRequest): BatchResult;

  /**
   * 批量读写操作，消耗各自对应的读写配额。同一个batch中多个操作修改同一行数据可能导致未定义行为（数据不一致），
   * 应当避免，另外如果一个batch包含同一行的读和写操作，其执行顺序是不确定的，不推荐使用
   */
  batch(request: BatchRequest, callback: Function): void;
}