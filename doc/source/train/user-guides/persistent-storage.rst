Configuration and Persistent Storage
====================================

.. _persistent-storage-guide:

.. _train-run-config:

Run Configuration in Train (``RunConfig``)
------------------------------------------

``RunConfig`` is a configuration object used in Ray Train to define the experiment
spec that corresponds to a call to ``trainer.fit()``.

It includes settings such as the experiment name, storage path for results,
stopping conditions, custom callbacks, checkpoint configuration, verbosity level,
and logging options.

Many of these settings are configured through other config objects and passed through
the ``RunConfig``. The following sub-sections contain descriptions of these configs.

The properties of the run configuration are :ref:`not tunable <tune-search-space-tutorial>`.

.. literalinclude:: ../doc_code/key_concepts.py
    :language: python
    :start-after: __run_config_start__
    :end-before: __run_config_end__

.. seealso::

    See the :class:`~ray.train.RunConfig` API reference.

    See :ref:`tune-storage-options` for storage configuration examples (related to ``storage_path``).


.. _train-log-dir:

Persistent storage
------------------
Ray Train saves results and checkpoints at a persistent storage location.
Per default, this is a local directory in ``~/ray_results``.

This directory will also contain logs generated on the driver, such as CSV
and JSON logs of the result, and logs that can be read using TensorBoard.

The default setup with a local directory is sufficient for single-node setups
or distributed training without :ref:`fault tolerance <train-fault-tolerance>`.
When you want to utilize fault tolerance, require access to shared data,
or are training on spot instances, it is recommended to set up
a remote persistent storage location.

The persistent storage location can be defined by passing a
``storage_path`` to the :ref:`RunConfig <train-run-config>`. This path
can be a location on remote storage (e.g. S3), or it can be a shared
network device, such as NFS.

.. code-block:: python

    # Remote storage location
    run_config = RunConfig(storage_path="s3://my_bucket/train_results")

    # Shared network filesystem
    run_config = RunConfig(storage_path="/mnt/cluster_storage/train_results")

When configuring a persistent storage path, it is important that all nodes have
access to the location.

.. _train-ray-storage:

Automatically setting up persistent storage
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
You can control where to store training results with the ``RAY_STORAGE``
environment variable.

For instance, if you set ``RAY_STORAGE="s3://my_bucket/train_results"``, your
results will automatically persisted there per default.

If you manually set a :attr:`RunConfig.storage_path <ray.train.RunConfig.storage_path>`, it
will take precedence over the environment variable.
